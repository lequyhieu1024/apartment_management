export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  seller_id: string;
  seller_name: string;
  building_id: string;
  category: string;
  condition: 'new' | 'used' | 'excellent';
  status: 'available' | 'sold' | 'reserved';
  created_at: string;
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}