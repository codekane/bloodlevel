import { Pharmacokinetics } from './pharmacokinetics';
import { DosageForm } from './dosage-form';

export interface Substance {
  id: number;
  name: string;
  pharmacokinetics?: Pharmacokinetics[]|[];
  dosage_forms?: DosageForm[]|[];
}
