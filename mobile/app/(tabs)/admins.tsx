import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/colors';
import { Crown, Plus} from 'lucide-react-native';
import { styles } from '@/assets/manageAdmin.style';
import { AdminCard } from '@/components/manage_admin/AdminCard';
import { IAdmin } from '@/interfaces/IAdmin';
import { axiosInstance } from '@/libs/axiosInstance';



const mockAdmins: IAdmin[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    email: 'admin1@example.com',
    buildings_count: 3,
    status: 'active',
    last_payment: '2025-01-01',
    monthly_fee: 2500000,
  },
  {
    id: '2',
    name: 'Trần Thị B',
    email: 'admin2@example.com',
    buildings_count: 1,
    status: 'active',
    last_payment: '2025-01-05',
    monthly_fee: 1500000,
  },
  {
    id: '3',
    name: 'Lê Văn C',
    email: 'admin3@example.com',
    buildings_count: 2,
    status: 'inactive',
    last_payment: '2024-11-15',
    monthly_fee: 2000000,
  },
];

export default function AdminsScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [admins, setAdmins] = useState<[] | IAdmin[]>([]);
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/super-admin/manage-admin');
      if (res.data.status) {
        setAdmins(res.data.data.data);
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Crown size={24} color={Colors.warning} />
        <Text style={styles.title}>Quản lý Admin</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      {
        loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <>
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
              data={admins}
              renderItem={({ item }) => <AdminCard admin={item} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.adminList}
              showsVerticalScrollIndicator={false}
              refreshing={loading}
              onRefresh={fetchAdmins}
            />
          </>
        )
      }
    </View>
  );
}