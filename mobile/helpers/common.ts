import { Colors } from '@/constants/colors';
import { IBuilding } from '@/interfaces/IBuilding';

export function convertToInt(decimal: any) {
  const intValue = Math.floor(decimal);
  return intValue.toLocaleString('vi-VN');
}

export function convertDate(isoString?: string | null): string {
  if (!isoString || isoString === "null" || isoString === "undefined") return "N/A";

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return "N/A";

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export function parseJson(value: Record<string, any>) {
  try {
    return JSON.parse(String(value));
  } catch {
    return {};
  }
}

export const formatCurrency = (amount: any) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export const getStatusBadgeStyle = (status: string) => {
  switch (status) {
    case 'active':
      return { backgroundColor: Colors.success + '20', color: Colors.success };
    case 'inactive':
      return { backgroundColor: Colors.error + '20', color: Colors.error };
    case 'pending':
      return { backgroundColor: Colors.warning + '20', color: Colors.warning };
    default:
      return { backgroundColor: Colors.neutral[200], color: Colors.neutral[600] };
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active': return 'HOẠT ĐỘNG';
    case 'inactive': return 'TẠM DỪNG';
    case 'pending': return 'CHỜ THANH TOÁN';
    default: return status.toUpperCase();
  }
};

export const getOccupancyRate = (building: any) => {
  const occupied = building?.occupied_rooms ?? 0;
  const total = building?.total_rooms ?? 0;

  if (total === 0) return 0;

  return Math.round((occupied / total) * 100);
};


export const autoGenerateBuildingCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
};
