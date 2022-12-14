export interface Pharmacokinetics {
  substance_id: number;
  ROI: string;
  bioavailability: string;
  tLag: string;
  tMax: string;
  tHalf: string;
  absorption_kinetics?: string;
  absorption_rate_constant?: string|number;
}
