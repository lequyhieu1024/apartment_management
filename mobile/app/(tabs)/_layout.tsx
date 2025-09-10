import { Tabs } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/colors';
import { Home, Building, MessageCircle, ShoppingBag, Settings, Users, CreditCard, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useAuth();

  const role: string | null = user?.role || null;

  const allTabs = [
    {
      name: 'index',
      title: 'Trang chủ',
      icon: Home,
      allowedRoles: ['super_admin', 'admin', 'member'],
    },
    {
      name: 'admins',
      title: 'QL Admin',
      icon: Users,
      allowedRoles: ['super_admin'],
    },
    {
      name: 'payments',
      title: 'Thanh toán',
      icon: CreditCard,
      allowedRoles: ['super_admin'],
    },
    {
      name: 'buildings',
      title: 'Tòa nhà',
      icon: Building,
      allowedRoles: ['admin'],
    },
    {
      name: 'chat',
      title: 'Tin nhắn',
      icon: MessageCircle,
      allowedRoles: ['admin', 'member'],
    },
    {
      name: 'marketplace',
      title: 'Chợ',
      icon: ShoppingBag,
      allowedRoles: ['member'],
    },
    {
      name: 'support',
      title: 'Hỗ trợ',
      icon: HelpCircle,
      allowedRoles: ['admin', 'super_admin'],
    },
    {
      name: 'settings',
      title: 'Cài đặt',
      icon: Settings,
      allowedRoles: ['super_admin', 'admin', 'member'],
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {allTabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ size, color }) => (
              <tab.icon size={size} color={color} />
            ),
            href: tab.allowedRoles.includes(role as string) ? undefined : null,
          }}
        />
      ))}
    </Tabs>
  );
}