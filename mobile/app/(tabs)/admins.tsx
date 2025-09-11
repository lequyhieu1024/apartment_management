import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/colors';
import { Crown, Plus} from 'lucide-react-native';
import { styles } from '@/assets/manageAdmin.style';
import { AdminCard } from '@/components/manage_admin/AdminCard';
import { IAdmin } from '@/interfaces/IAdmin';
import { axiosInstance } from '@/libs/axiosInstance';

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

        <View style={styles.summary}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{admins.length}</Text>
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
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: "center" }}>
              <Text>Hiện chưa có admin nào sử dụng hệ thống</Text>
            </View>
          }
        />
    </View>
  );
}