export interface Pharmacokinetics {
  substance_id: number;
  ROI: string;
  bioavailability: string;
  tOnset: string;
  tMax: string;
  tHalf: string;
  absorption_kinetics?: string;
  absorption_rate_constant?: string|number;
}
