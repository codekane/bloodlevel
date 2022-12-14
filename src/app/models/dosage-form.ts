export interface DosageForm {
  id: number;
  name: string;
  substance_id: number;
  doses: DosageFormDose[]|[];
}

export interface DosageFormDose {
  dosage: string|number;
  dosage_unit: string;
  tLag: string|number;
  tOffset: string;
}
