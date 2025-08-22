import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { Users, DollarSign, Building, TrendingUp, Crown } from 'lucide-react-native';

export default function SuperAdminDashboard() {
  const stats = [
    { title: 'Total Admins', value: '156', icon: Users, color: Colors.primary },
    { title: 'Monthly Revenue', value: '₫45.2M', icon: DollarSign, color: Colors.success },
    { title: 'Active Buildings', value: '89', icon: Building, color: Colors.secondary },
    { title: 'Growth Rate', value: '+12.5%', icon: TrendingUp, color: Colors.accent },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Crown size={24} color={Colors.warning} />
        <Text style={styles.title}>Super Admin Dashboard</Text>
        <Text style={styles.subtitle}>Quản lý hệ thống PropertyHub</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <TouchableOpacity key={index} style={styles.statCard}>
            <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
              <stat.icon size={24} color={stat.color} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Users size={20} color={Colors.primary} />
            <Text style={styles.actionText}>Manage Admins</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <DollarSign size={20} color={Colors.success} />
            <Text style={styles.actionText}>View Payments</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recentActivity}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: Colors.success }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New admin registration</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={[styles.activityDot, { backgroundColor: Colors.warning }]} />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Payment overdue warning</Text>
              <Text style={styles.activityTime}>4 hours ago</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statTitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  quickActions: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionText: {
    fontSize: 12,
    color: Colors.text,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  recentActivity: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  activityList: {
    gap: Spacing.md,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: Colors.text,
  },
  activityTime: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});