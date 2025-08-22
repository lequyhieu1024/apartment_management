import { Tabs } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/colors';
import { Chrome as Home, Building, MessageCircle, ShoppingBag, Settings, Users, CreditCard, CircleHelp as HelpCircle } from 'lucide-react-native';

export default function TabLayout() {
  const { user } = useAuth();

  const getTabsForRole = () => {
    if (user?.role === 'super_admin') {
      return (
        <>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ size, color }) => (
                <Home size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="admins"
            options={{
              title: 'Admins',
              tabBarIcon: ({ size, color }) => (
                <Users size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="payments"
            options={{
              title: 'Payments',
              tabBarIcon: ({ size, color }) => (
                <CreditCard size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ size, color }) => (
                <Settings size={size} color={color} />
              ),
            }}
          />
        </>
      );
    }

    if (user?.role === 'admin') {
      return (
        <>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
              tabBarIcon: ({ size, color }) => (
                <Home size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="buildings"
            options={{
              title: 'Tòa nhà',
              tabBarIcon: ({ size, color }) => (
                <Building size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="chat"
            options={{
              title: 'Chat',
              tabBarIcon: ({ size, color }) => (
                <MessageCircle size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ size, color }) => (
                <Settings size={size} color={color} />
              ),
            }}
          />
        </>
      );
    }

    // Member role
    return (
      <>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Trang chủ',
            tabBarIcon: ({ size, color }) => (
              <Home size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="marketplace"
          options={{
            title: 'Chợ',
            tabBarIcon: ({ size, color }) => (
              <ShoppingBag size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ size, color }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="support"
          options={{
            title: 'Hỗ trợ',
            tabBarIcon: ({ size, color }) => (
              <HelpCircle size={size} color={color} />
            ),
          }}
        />
      </>
    );
  };

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
      }}>
      {getTabsForRole()}
    </Tabs>
  );
}