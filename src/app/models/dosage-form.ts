export interface DosageForm {
  id: number;
  name: string;
  substance_id: number;
  doses: DosageFormDose[]|[];
}

export interface DosageFormDose {
  dosage: string;
  dosage_unit: string;
  tOffset: string;
}
