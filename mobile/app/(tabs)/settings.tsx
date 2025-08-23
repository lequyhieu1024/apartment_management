import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { Settings as SettingsIcon, User, Bell, Shield, CircleHelp as HelpCircle, LogOut, Moon, Globe, CreditCard, Crown } from 'lucide-react-native';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/(auth)/login');
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    showSwitch = false, 
    switchValue = false, 
    onSwitchChange,
    rightText,
    iconColor = Colors.primary 
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showSwitch?: boolean;
    switchValue?: boolean;
    onSwitchChange?: (value: boolean) => void;
    rightText?: string;
    iconColor?: string;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, { backgroundColor: iconColor + '20' }]}>
          <Icon size={20} color={iconColor} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        {showSwitch && (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: Colors.neutral[300], true: Colors.primary + '40' }}
            thumbColor={switchValue ? Colors.primary : Colors.neutral[100]}
          />
        )}
      </View>
    </TouchableOpacity>
  );

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Quản lý tòa nhà';
      case 'member': return 'Cư dân';
      default: return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return Crown;
      case 'admin': return Shield;
      case 'member': return User;
      default: return User;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SettingsIcon size={24} color={Colors.primary} />
        <Text style={styles.title}>Cài đặt</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tài khoản</Text>
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <View style={styles.roleContainer}>
                {/*{getRoleIcon(user?.role || 'member')({ size: 14, color: Colors.primary })}*/}
                <Text style={styles.roleText}>{getRoleLabel(user?.role || 'member')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cài đặt tài khoản</Text>
          <SettingItem
            icon={User}
            title="Thông tin cá nhân"
            subtitle="Cập nhật thông tin và avatar"
            onPress={() => {}}
          />
          {user?.role === 'admin' && (
            <SettingItem
              icon={CreditCard}
              title="Quản lý thanh toán"
              subtitle="Xem lịch sử và cập nhật thông tin thanh toán"
              onPress={() => {}}
              iconColor={Colors.success}
            />
          )}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ứng dụng</Text>
          <SettingItem
            icon={Bell}
            title="Thông báo"
            subtitle="Quản lý thông báo push"
            showSwitch={true}
            switchValue={true}
            onSwitchChange={() => {}}
          />
          <SettingItem
            icon={Moon}
            title="Chế độ tối"
            subtitle="Bật/tắt giao diện tối"
            showSwitch={true}
            switchValue={false}
            onSwitchChange={() => {}}
          />
          <SettingItem
            icon={Globe}
            title="Ngôn ngữ"
            rightText="Tiếng Việt"
            onPress={() => {}}
          />
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hỗ trợ</Text>
          <SettingItem
            icon={HelpCircle}
            title="Trung tâm trợ giúp"
            subtitle="FAQ và hướng dẫn sử dụng"
            onPress={() => {}}
            iconColor={Colors.secondary}
          />
          <SettingItem
            icon={Shield}
            title="Chính sách bảo mật"
            subtitle="Điều khoản sử dụng và bảo mật"
            onPress={() => {}}
            iconColor={Colors.warning}
          />
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <SettingItem
            icon={LogOut}
            title="Đăng xuất"
            onPress={handleLogout}
            iconColor={Colors.error}
          />
        </View>
      </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  profileCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  roleText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    marginLeft: Spacing.xs,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginRight: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  settingSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  settingRight: {
    alignItems: 'flex-end',
  },
  rightText: {
    fontSize: 13,
    color: Colors.textMuted,
  },
});