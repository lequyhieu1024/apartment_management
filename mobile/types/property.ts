export interface Building {
  id: string;
  name: string;
  address: string;
  admin_id: string;
  created_at: string;
  total_rooms: number;
  occupied_rooms: number;
  monthly_revenue: number;
}

export interface Room {
  id: string;
  building_id: string;
  room_number: string;
  rent_amount: number;
  status: 'available' | 'occupied' | 'maintenance';
  member_id?: string;
  contract_start?: string;
  contract_end?: string;
}

export interface Contract {
  id: string;
  room_id: string;
  member_id: string;
  start_date: string;
  end_date: string;
  monthly_rent: number;
  deposit: number;
  status: 'active' | 'expired' | 'terminated';
}

export interface Payment {
  id: string;
  room_id: string;
  member_id: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  status: 'pending' | 'paid' | 'overdue';
  type: 'rent' | 'utilities' | 'deposit';
}