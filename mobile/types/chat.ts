export interface ChatMessage {
  id: string;
  chat_id: string;
  sender_id: string;
  sender_name: string;
  content: string;
  type: 'text' | 'image' | 'file';
  timestamp: string;
  read_by: string[];
}

export interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group' | 'building';
  participants: string[];
  last_message?: ChatMessage;
  unread_count: number;
  building_id?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: 'maintenance' | 'complaint' | 'request' | 'emergency';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  member_id: string;
  building_id: string;
  room_id?: string;
  created_at: string;
  resolved_at?: string;
}