export interface IAdmin {
  id: string;
  name: string;
  email: string;
  buildings_count: number;
  status: 'active' | 'inactive';
  last_payment?: string;
  monthly_fee?: number;
}