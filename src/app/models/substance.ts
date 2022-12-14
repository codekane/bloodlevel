import { Pharmacokinetics } from './pharmacokinetics';
import { DosageForm } from './dosage-form';

export interface Substance {
  id: number;
  name: string;
  pharmacokinetics?: Pharmacokinetics[]|[];
  dosage_forms?: DosageForm[]|[];
  volume_of_distribution?: string;
  elimination_rate_constant?: string|number;
  half_life?: string|number;
}
