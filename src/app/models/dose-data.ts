import { DoseRecord } from './dose-record';
import { Substance } from './substance';
import { Optional } from '@angular/core';
import { DosageFormDose } from './dosage-form';
export class DoseData {
  id?: number;
  substance_id: number;
  dosage_form_id?: number|null;
  dosage: string|number;
  dosage_unit: string;
  ROI: string;
  substance: Substance;

  timestamp: string;

  datestamp: Date|null;
  endstamp: Date|null;

  data_ready: Boolean;

  constructor(doseRecord:DoseRecord, substance:Substance) {
    if (doseRecord.id)
      this.id = doseRecord.id;
    this.substance_id = doseRecord.substance_id;
    if (doseRecord.dosage_form_id)
      this.dosage_form_id = doseRecord.dosage_form_id;
    this.dosage = doseRecord.dosage;
    this.dosage_unit = doseRecord.dosage_unit;

    this.substance = substance!;

    this.timestamp = doseRecord.timestamp;
    [this.datestamp, this.endstamp] = this.create_datestamps(this.timestamp, Number(substance.half_life));

    this.ROI = doseRecord.ROI;

    this.data_ready = this.validate_dataset();

  }

  create_datestamps(timestamp:string, half_life:number):(Date|null)[] {
    let [date, time] = [timestamp.match(/\d+-\d+-\d+/), timestamp.match(/\d{2}:\d{2}:\d{2}/)];
    if (date && time && date.length >= 1 && time.length >= 1) {
      let datestamp:Date = new Date(date[0] + "T" + time[0]);
      let dsCopy = new Date(datestamp.getTime());
      let endstamp:Date = new Date(dsCopy.setHours(dsCopy.getHours() + 6 * half_life));
      if (datestamp && endstamp)
        return [datestamp, endstamp]
      else
        return [null, null]
    } else {
      return [null, null]
    }

  }

  validate_dataset():Boolean {
    if (!this.substance || !this.substance.pharmacokinetics || !this.substance.volume_of_distribution) {
      return false
    } else if (!this.substance.elimination_rate_constant || !this.substance.half_life) {
      return false
    } else if (!this.substance.pharmacokinetics.filter( kinetic => kinetic.ROI == this.ROI)) {
      return false
    } else {
      return true
    }
  }

  calculateBloodLevel(time:Date) {
    if (!this.substance || !this.substance.pharmacokinetics) { return 0 }
    let substance = this.substance;
    let pharmacokinetics = this.substance.pharmacokinetics.find(pharm => pharm.ROI == this.ROI)
    if (!pharmacokinetics) { return 0 }

    let time_elapsed:number = this.calculateHoursElapsed(time);
    if (Number(pharmacokinetics.tLag) > time_elapsed)
      return 0

    let doses:DosageFormDose[]|undefined = undefined;
    if (this.ROI == "Oral" && this.dosage_form_id && substance.dosage_forms) {
      let dosage_form = substance.dosage_forms.find( form => form.id == this.dosage_form_id);
      doses = dosage_form!.doses.map( dose => {
        if (dose.dosage_unit == "%") {
          dose.dosage = (Number(dose.dosage) / 100) * 30;
          dose.dosage_unit = "mg";
        }
        return dose
      });
    }
    let bioavailability = Number(pharmacokinetics.bioavailability) / 100;
    let vd = 200; // Hardcoding this for now, since it's not set up to calculate, nor am I collecting patient data
    let ka = Number(pharmacokinetics.absorption_rate_constant);
    let ke = Number(substance.elimination_rate_constant);

    if (!doses) {
      let x:number = time_elapsed - Number(pharmacokinetics.tLag);
      let dose = Number(this.dosage);
      return this.calculateSingleDoseConcentration(x, bioavailability, vd, ka, ke, dose);

    } else {
      console.log("Found multiple doses!");
      let total = 0;
      for (let d in doses) {
        let total_lag = Number(doses[d].tLag) + Number(pharmacokinetics.tLag);
        if (total_lag > time_elapsed) {
          total += 0
        } else {
          let x:number = time_elapsed - total_lag;
          let dose = Number(doses[d].dosage);
          total += this.calculateSingleDoseConcentration(x, bioavailability, vd, ka, ke, dose);
        }
      }
      return total
    }

  }

  // x=hours, bioavailability = 0.xx, vd = volume of distribution(L)
  // ka = absorption rate constant ( x/h) ke = elimination rate constant ( y/h)
  calculateSingleDoseConcentration(x:number, bioavailability:number, vd:number, ka:number, ke:number, dose:number) {
    let firstPart = ((bioavailability * dose * ka) / (vd * ka - vd * ke));
    let secondPart = (Math.exp(-ke * x) - Math.exp(-ka * x));
    let c = firstPart * secondPart;

    return c;
  }

  calculateHoursElapsed(time:Date):number {
    if (this.datestamp) { return Math.abs(+this.datestamp - +time) / 36e5; }
    return 0
  }


}
