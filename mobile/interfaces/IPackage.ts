export interface IPackage {
  id: string;
  name: string;
  features: Record<string, any>;
  price: number;
  price_type: 'per_month' | 'per_year';
  sale: number;
  sale_type: 'fixed' | 'percentage';
  created_at: string;
  updated_at: string;
}

export const mockPackage: IPackage[] = [
  {
    id: '1',
    name: 'Gói Cơ Bản',
    features: {
      "Số lượng toà nhà": 3,
      "Số lượng phòng": 20,
      "Số lượng member": 10,
      "Chợ member": "Không có",
      "Thanh toán online": "Không có",
      "Tự tạo hoá đơn": "Không có",
      "Thông báo đẩy": "Không có",
    },
    price: 2500000,
    price_type: 'per_month',
    sale: 10,
    sale_type: 'percentage',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-10T00:00:00Z',
  },
  {
    id: '2',
    name: 'Gói Nâng Cao',
    features: {
      "Số lượng toà nhà": 3,
      "Số lượng phòng": 20,
      "Số lượng member": 10,
      "Chợ member": "Không có",
      "Thanh toán online": "Không có",
      "Tự tạo hoá đơn": "Không có",
      "Thông báo đẩy": "Không có",
    },
    price: 1500000,
    price_type: 'per_month',
    sale: 200000,
    sale_type: 'fixed',
    created_at: '2025-01-05T00:00:00Z',
    updated_at: '2025-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Gói Doanh Nghiệp',
    features: {
      "Số lượng toà nhà": 3,
      "Số lượng phòng": 20,
      "Số lượng member": 10,
      "Chợ member": "Không có",
      "Thanh toán online": "Không có",
      "Tự tạo hoá đơn": "Không có",
      "Thông báo đẩy": "Không có",
    },
    price: 2000000,
    price_type: 'per_year',
    sale: 15,
    sale_type: 'percentage',
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2024-12-15T00:00:00Z',
  },
  {
    id: '4',
    name: 'Gói Doanh Nghiệp',
    features: {
      "Số lượng toà nhà": 3,
      "Số lượng phòng": 20,
      "Số lượng member": 10,
      "Chợ member": "Không có",
      "Thanh toán online": "Không có",
      "Tự tạo hoá đơn": "Không có",
      "Thông báo đẩy": "Không có",
    },
    price: 2000000,
    price_type: 'per_year',
    sale: 15,
    sale_type: 'percentage',
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2024-12-15T00:00:00Z',
  },
  {
    id: '5',
    name: 'Gói Doanh Nghiệp',
    features: {
      "Số lượng toà nhà": 3,
      "Số lượng phòng": 20,
      "Số lượng member": 10,
      "Chợ member": "Không có",
      "Thanh toán online": "Không có",
      "Tự tạo hoá đơn": "Không có",
      "Thông báo đẩy": "Không có",
    },
    price: 2000000,
    price_type: 'per_year',
    sale: 15,
    sale_type: 'percentage',
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2024-12-15T00:00:00Z',
  },
  {
    id: '6',
    name: 'Gói Doanh Nghiệp',
    features: {
      "Số lượng toà nhà": 3,
      "Số lượng phòng": 20,
      "Số lượng member": 10,
      "Chợ member": "Không có",
      "Thanh toán online": "Không có",
      "Tự tạo hoá đơn": "Không có",
      "Thông báo đẩy": "Không có",
    },
    price: 2000000,
    price_type: 'per_year',
    sale: 15,
    sale_type: 'percentage',
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2024-12-15T00:00:00Z',
  },
];
