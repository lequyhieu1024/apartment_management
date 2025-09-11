import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { Building, Users, DollarSign, CircleAlert as AlertCircle, Shield } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminDashboard() {
  const stats = [
    { title: 'Tòa nhà', value: '3', icon: Building, color: Colors.primary },
    { title: 'Phòng cho thuê', value: '45', icon: Users, color: Colors.secondary },
    { title: 'Doanh thu tháng', value: '₫125M', icon: DollarSign, color: Colors.success },
    { title: 'Ticket chờ', value: '8', icon: AlertCircle, color: Colors.warning },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Shield size={24} color={Colors.primary} />
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Quản lý tòa nhà và phòng trọ</Text>
      </View>

      <View style={styles.subscriptionStatus}>
        <View style={styles.subscriptionHeader}>
          <Text style={styles.subscriptionTitle}>Subscription Status</Text>
          <View style={[styles.statusBadge, styles.statusActive]}>
            <Text style={styles.statusText}>ACTIVE</Text>
          </View>
        </View>
        <Text style={styles.subscriptionInfo}>
          Gói Pro - Hết hạn: 15/02/2025
        </Text>
        <Text style={styles.subscriptionPrice}>₫2,500,000/tháng</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <TouchableOpacity key={index} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={20} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Building size={18} color={Colors.primary} />
            <Text style={styles.actionText}>Thêm tòa nhà</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Users size={18} color={Colors.secondary} />
            <Text style={styles.actionText}>Quản lý phòng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <DollarSign size={18} color={Colors.success} />
            <Text style={styles.actionText}>Thu tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <AlertCircle size={18} color={Colors.warning} />
            <Text style={styles.actionText}>Xử lý ticket</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recentPayments}>
        <Text style={styles.sectionTitle}>Thanh toán gần đây</Text>
        <View style={styles.paymentList}>
          <View style={styles.paymentItem}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentRoom}>Phòng 101 - Tòa A</Text>
              <Text style={styles.paymentDate}>Hôm nay</Text>
            </View>
            <Text style={styles.paymentAmount}>₫3,500,000</Text>
          </View>
          <View style={styles.paymentItem}>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentRoom}>Phòng 205 - Tòa B</Text>
              <Text style={styles.paymentDate}>Hôm qua</Text>
            </View>
            <Text style={styles.paymentAmount}>₫2,800,000</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  subscriptionStatus: {
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statusActive: {
    backgroundColor: Colors.success + '20',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.success,
  },
  subscriptionInfo: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  subscriptionPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statTitle: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  quickActions: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  actionCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionText: {
    fontSize: 11,
    color: Colors.text,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  recentPayments: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  paymentList: {
    gap: Spacing.md,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentRoom: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  paymentDate: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.success,
  },
});