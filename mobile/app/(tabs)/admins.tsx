import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Plus } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { Users, Building, CreditCard, CircleAlert as AlertCircle, Crown } from 'lucide-react-native';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  buildings_count: number;
  subscription_status: 'active' | 'inactive' | 'pending';
  last_payment: string;
  monthly_fee: number;
}

const mockAdmins: AdminUser[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'admin1@example.com',
    buildings_count: 3,
    subscription_status: 'active',
    last_payment: '2025-01-01',
    monthly_fee: 2500000,
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'admin2@example.com',
    buildings_count: 1,
    subscription_status: 'active',
    last_payment: '2025-01-05',
    monthly_fee: 1500000,
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'admin3@example.com',
    buildings_count: 2,
    subscription_status: 'inactive',
    last_payment: '2024-11-15',
    monthly_fee: 2000000,
  },
];

export default function AdminsScreen() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusBadgeStyle = (status: string) => {
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'HOẠT ĐỘNG';
      case 'inactive': return 'TẠM DỪNG';
      case 'pending': return 'CHỜ THANH TOÁN';
      default: return status.toUpperCase();
    }
  };

  const AdminCard = ({ admin }: { admin: AdminUser }) => {
    const statusStyle = getStatusBadgeStyle(admin.subscription_status);
    
    return (
      <TouchableOpacity style={styles.adminCard}>
        <View style={styles.adminHeader}>
          <View style={styles.adminBasicInfo}>
            <Text style={styles.adminName}>{admin.name}</Text>
            <Text style={styles.adminEmail}>{admin.email}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {getStatusLabel(admin.subscription_status)}
            </Text>
          </View>
        </View>

        <View style={styles.adminStats}>
          <View style={styles.statItem}>
            <Building size={16} color={Colors.primary} />
            <Text style={styles.statText}>{admin.buildings_count} tòa nhà</Text>
          </View>
          <View style={styles.statItem}>
            <CreditCard size={16} color={Colors.success} />
            <Text style={styles.statText}>{formatCurrency(admin.monthly_fee)}/tháng</Text>
          </View>
        </View>

        <View style={styles.adminFooter}>
          <Text style={styles.lastPayment}>
            Thanh toán cuối: {new Date(admin.last_payment).toLocaleDateString('vi-VN')}
          </Text>
          {admin.subscription_status === 'inactive' && (
            <View style={styles.warningContainer}>
              <AlertCircle size={14} color={Colors.error} />
              <Text style={styles.warningText}>Cần thanh toán để tiếp tục</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Crown size={24} color={Colors.warning} />
        <Text style={styles.title}>Quản lý Admin</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>156</Text>
          <Text style={styles.summaryLabel}>Tổng Admin</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>142</Text>
          <Text style={styles.summaryLabel}>Đang hoạt động</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>14</Text>
          <Text style={styles.summaryLabel}>Chưa thanh toán</Text>
        </View>
      </View>

      <FlatList
        data={mockAdmins}
        renderItem={({ item }) => <AdminCard admin={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.adminList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginLeft: Spacing.sm,
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  adminList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  adminCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  adminHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  adminBasicInfo: {
    flex: 1,
  },
  adminName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  adminEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  adminStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: Colors.text,
    marginLeft: Spacing.xs,
  },
  adminFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  lastPayment: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warningText: {
    fontSize: 11,
    color: Colors.error,
    marginLeft: Spacing.xs,
  },
});