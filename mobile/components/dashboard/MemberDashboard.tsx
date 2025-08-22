import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { Chrome as Home, DollarSign, MessageCircle, ShoppingBag, CircleHelp as HelpCircle, Calendar } from 'lucide-react-native';

export default function MemberDashboard() {
  const quickActions = [
    { title: 'Thanh toán', icon: DollarSign, color: Colors.success },
    { title: 'Chat', icon: MessageCircle, color: Colors.primary },
    { title: 'Chợ', icon: ShoppingBag, color: Colors.accent },
    { title: 'Hỗ trợ', icon: HelpCircle, color: Colors.warning },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Xin chào!</Text>
        <Text style={styles.userName}>Nguyễn Văn A</Text>
        <Text style={styles.roomInfo}>Phòng 101 - Tòa nhà Sunrise</Text>
      </View>

      <View style={styles.rentStatus}>
        <View style={styles.rentHeader}>
          <Calendar size={20} color={Colors.primary} />
          <Text style={styles.rentTitle}>Trạng thái thuê phòng</Text>
        </View>
        <View style={styles.rentDetails}>
          <View style={styles.rentItem}>
            <Text style={styles.rentLabel}>Tiền thuê tháng này:</Text>
            <Text style={styles.rentValue}>₫3,500,000</Text>
          </View>
          <View style={styles.rentItem}>
            <Text style={styles.rentLabel}>Hạn thanh toán:</Text>
            <Text style={[styles.rentValue, { color: Colors.warning }]}>15/01/2025</Text>
          </View>
          <View style={styles.rentItem}>
            <Text style={styles.rentLabel}>Trạng thái:</Text>
            <View style={[styles.statusBadge, styles.statusPending]}>
              <Text style={styles.statusText}>CHƯA THANH TOÁN</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
        <View style={styles.actionGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.actionCard}>
              <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
                <action.icon size={20} color={action.color} />
              </View>
              <Text style={styles.actionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.announcements}>
        <Text style={styles.sectionTitle}>Thông báo chung cư</Text>
        <View style={styles.announcementList}>
          <View style={styles.announcementItem}>
            <Text style={styles.announcementTitle}>Bảo trì thang máy</Text>
            <Text style={styles.announcementContent}>
              Thang máy tòa A sẽ bảo trì từ 8h-12h ngày mai
            </Text>
            <Text style={styles.announcementTime}>2 giờ trước</Text>
          </View>
          <View style={styles.announcementItem}>
            <Text style={styles.announcementTitle}>Họp cư dân</Text>
            <Text style={styles.announcementContent}>
              Họp cư dân tháng 1 vào Chủ nhật tuần tới
            </Text>
            <Text style={styles.announcementTime}>1 ngày trước</Text>
          </View>
        </View>
      </View>

      <View style={styles.marketplace}>
        <Text style={styles.sectionTitle}>Chợ chung cư</Text>
        <View style={styles.productGrid}>
          <View style={styles.productCard}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>Tủ lạnh Samsung</Text>
            <Text style={styles.productPrice}>₫8,500,000</Text>
          </View>
          <View style={styles.productCard}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.productImage}
            />
            <Text style={styles.productTitle}>Xe đạp điện</Text>
            <Text style={styles.productPrice}>₫12,000,000</Text>
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
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  roomInfo: {
    fontSize: 14,
    color: Colors.primary,
    marginTop: Spacing.xs,
  },
  rentStatus: {
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  rentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  rentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  rentDetails: {
    gap: Spacing.sm,
  },
  rentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rentLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  rentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  statusPending: {
    backgroundColor: Colors.warning + '20',
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.warning,
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
  iconContainer: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  actionText: {
    fontSize: 11,
    color: Colors.text,
    textAlign: 'center',
  },
  announcements: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  announcementList: {
    gap: Spacing.md,
  },
  announcementItem: {
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  announcementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  announcementContent: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  announcementTime: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  marketplace: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  productGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  productCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  productImage: {
    width: '100%',
    height: 80,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    padding: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.accent,
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
});