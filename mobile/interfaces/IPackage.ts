export interface IPackage {
  id: string;
  name: string;
  features: Record<string, any>;
  price_month: number;
  price_year: number;
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
    price_month: 2500000,
    price_year: 26000000,
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
    price_month: 1500000,
    price_year: 17000000,
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
    price_month: 500000,
    price_year: 7000000,
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
    price_month: 2500000,
    price_year: 26000000,
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
    price_month: 2500000,
    price_year: 26000000,
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
    price_month: 2500000,
    price_year: 26000000,
    created_at: '2024-12-01T00:00:00Z',
    updated_at: '2024-12-15T00:00:00Z',
  },
];
