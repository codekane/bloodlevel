export interface DoseRecord {
  id?: number;
  substance_id: number;
  dosage_form_id?: number|null;
  dosage: string|number;
  timestamp: string;
  ROI: string;
  dosage_unit: string;

}

export interface DoseRecords {
  dose_records: DoseRecord[]|[]
}
