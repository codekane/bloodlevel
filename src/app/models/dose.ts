export const DOSES: Dose[] = [
  {"id": '1', "date": "2022-11-19", "time": "17:30", "substance": "Dexedrine IR", "dosage": 15, "dosage_unit": "mg"},
  {"id": '2', "date": "2022-11-19", "time": "18:15", "substance": "Dexedrine IR", "dosage": 10, "dosage_unit": "mg"},
  {"id": '3', "date": "2022-11-19", "time": "22:15", "substance": "Dexedrine IR", "dosage": 15, "dosage_unit": "mg"},
  {"id": '4', "date": "2022-11-20", "time": "03:35", "substance": "Dexedrine IR", "dosage": 10, "dosage_unit": "mg"},
  {"id": '5', "date": "2022-11-20", "time": "04:20", "substance": "Dexedrine IR", "dosage": 10, "dosage_unit": "mg"},
]

export interface Dose {
  id: string,
  date: string,
  time: string,
  substance: string,
  dosage: number,
  dosage_unit: string
}
