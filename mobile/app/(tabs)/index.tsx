import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import SuperAdminDashboard from '@/components/dashboard/SuperAdminDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import MemberDashboard from '@/components/dashboard/MemberDashboard';

export default function HomeScreen() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'member':
        return <MemberDashboard />;
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {renderDashboard()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  text: {
    fontSize: 16,
    color: Colors.text,
  },
});