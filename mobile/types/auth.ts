export type UserRole = 'super_admin' | 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
  building_id?: string;
  room_id?: string;
  subscription_status?: 'active' | 'inactive' | 'pending';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}