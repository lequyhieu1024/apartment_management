export interface IBuilding {
  id?: string;
  name?: string;
  code?: string;
  address?: string;
  owner_user_id?: number | string;
  thumbnail?: string;
  description?: string;
  total_rooms?: number;
  occupied_rooms?: number;
  monthly_revenue?: number;
  owner?: any; // user model
  created_at?: string;
  updated_at?: string;
}