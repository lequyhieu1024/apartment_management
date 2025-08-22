import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { CreditCard, TrendingUp, DollarSign, CircleAlert as AlertCircle, CircleCheck as CheckCircle, Clock } from 'lucide-react-native';

interface PaymentRecord {
  id: string;
  admin_id: string;
  admin_name: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  status: 'pending' | 'paid' | 'overdue';
  period: string;
  buildings_count: number;
}

const mockPayments: PaymentRecord[] = [
  {
    id: '1',
    admin_id: 'admin1',
    admin_name: 'Nguyễn Văn A',
    amount: 2500000,
    due_date: '2025-01-15',
    paid_date: '2025-01-10',
    status: 'paid',
    period: 'Tháng 01/2025',
    buildings_count: 3,
  },
  {
    id: '2',
    admin_id: 'admin2',
    admin_name: 'Trần Thị B',
    amount: 1500000,
    due_date: '2025-01-15',
    status: 'pending',
    period: 'Tháng 01/2025',
    buildings_count: 1,
  },
  {
    id: '3',
    admin_id: 'admin3',
    admin_name: 'Lê Văn C',
    amount: 2000000,
    due_date: '2024-12-15',
    status: 'overdue',
    period: 'Tháng 12/2024',
    buildings_count: 2,
  },
];

export default function PaymentsScreen() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={16} color={Colors.success} />;
      case 'pending':
        return <Clock size={16} color={Colors.warning} />;
      case 'overdue':
        return <AlertCircle size={16} color={Colors.error} />;
      default:
        return <Clock size={16} color={Colors.textMuted} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'ĐÃ THANH TOÁN';
      case 'pending': return 'CHỜ THANH TOÁN';
      case 'overdue': return 'QUÁ HẠN';
      default: return status.toUpperCase();
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid':
        return { backgroundColor: Colors.success + '20', color: Colors.success };
      case 'pending':
        return { backgroundColor: Colors.warning + '20', color: Colors.warning };
      case 'overdue':
        return { backgroundColor: Colors.error + '20', color: Colors.error };
      default:
        return { backgroundColor: Colors.neutral[200], color: Colors.neutral[600] };
    }
  };

  const filteredPayments = mockPayments.filter(payment => {
    if (selectedTab === 'all') return true;
    return payment.status === selectedTab;
  });

  const totalRevenue = mockPayments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingPayments = mockPayments.filter(p => p.status === 'pending').length;
  const overduePayments = mockPayments.filter(p => p.status === 'overdue').length;

  const PaymentCard = ({ payment }: { payment: PaymentRecord }) => {
    const statusStyle = getStatusStyle(payment.status);
    
    return (
      <TouchableOpacity style={styles.paymentCard}>
        <View style={styles.paymentHeader}>
          <View style={styles.adminInfo}>
            <Text style={styles.adminName}>{payment.admin_name}</Text>
            <Text style={styles.adminEmail}>{payment.admin_email}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {getStatusLabel(payment.status)}
            </Text>
          </View>
        </View>

        <View style={styles.paymentDetails}>
          <View style={styles.paymentAmount}>
            <Text style={styles.amountLabel}>Số tiền:</Text>
            <Text style={styles.amountValue}>{formatCurrency(payment.amount)}</Text>
          </View>
          <View style={styles.paymentPeriod}>
            <Text style={styles.periodLabel}>Kỳ thanh toán:</Text>
            <Text style={styles.periodValue}>{payment.period}</Text>
          </View>
        </View>

        <View style={styles.paymentFooter}>
          <View style={styles.buildingInfo}>
            <Building size={14} color={Colors.textMuted} />
            <Text style={styles.buildingText}>{payment.buildings_count} tòa nhà</Text>
          </View>
          <Text style={styles.dueDate}>
            Hạn: {new Date(payment.due_date).toLocaleDateString('vi-VN')}
          </Text>
        </View>

        {payment.paid_date && (
          <View style={styles.paidInfo}>
            <CheckCircle size={14} color={Colors.success} />
            <Text style={styles.paidText}>
              Đã thanh toán: {new Date(payment.paid_date).toLocaleDateString('vi-VN')}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const tabs = [
    { id: 'all', label: 'Tất cả', count: mockPayments.length },
    { id: 'pending', label: 'Chờ', count: pendingPayments },
    { id: 'overdue', label: 'Quá hạn', count: overduePayments },
    { id: 'paid', label: 'Đã trả', count: mockPayments.filter(p => p.status === 'paid').length },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Management</Text>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryCard}>
          <TrendingUp size={20} color={Colors.success} />
          <Text style={styles.summaryValue}>{formatCurrency(totalRevenue)}</Text>
          <Text style={styles.summaryLabel}>Doanh thu tháng này</Text>
        </View>
        <View style={styles.summaryCard}>
          <Clock size={20} color={Colors.warning} />
          <Text style={styles.summaryValue}>{pendingPayments}</Text>
          <Text style={styles.summaryLabel}>Chờ thanh toán</Text>
        </View>
        <View style={styles.summaryCard}>
          <AlertCircle size={20} color={Colors.error} />
          <Text style={styles.summaryValue}>{overduePayments}</Text>
          <Text style={styles.summaryLabel}>Quá hạn</Text>
        </View>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              selectedTab === tab.id && styles.tabSelected
            ]}
            onPress={() => setSelectedTab(tab.id as any)}
          >
            <Text style={[
              styles.tabText,
              selectedTab === tab.id && styles.tabTextSelected
            ]}>
              {tab.label} ({tab.count})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredPayments}
        renderItem={({ item }) => <PaymentCard payment={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.paymentList}
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
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  summary: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  summaryLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabSelected: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tabTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  paymentList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  paymentCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  adminInfo: {
    flex: 1,
  },
  adminName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  adminEmail: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statusText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  paymentDetails: {
    marginBottom: Spacing.md,
  },
  paymentAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  amountLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  amountValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
  },
  paymentPeriod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  periodLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  periodValue: {
    fontSize: 13,
    color: Colors.text,
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  buildingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buildingText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginLeft: Spacing.xs,
  },
  dueDate: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  paidInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  paidText: {
    fontSize: 11,
    color: Colors.success,
    marginLeft: Spacing.xs,
  },
});