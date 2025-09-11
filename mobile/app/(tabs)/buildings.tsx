import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Building, Plus, Users, DollarSign } from 'lucide-react-native';
import { BuildingCard } from '@/components/building/BuildingCard';
import { styles } from '@/assets/building.style';
import { IAdmin } from '@/interfaces/IAdmin';
import { axiosInstance } from '@/libs/axiosInstance';
import { router } from 'expo-router';

export default function BuildingsScreen() {

  const [loading, setLoading] = useState<boolean>(false);
  const [buildings, setBuildings] = useState<[] | IAdmin[]>([]);
  const fetchBuildings = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/admin/buildings');
      if (res.data.status) {
        setBuildings(res.data.data.data);
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tòa nhà của tôi</Text>
        <TouchableOpacity onPress={() => router.push('/(stacks)/buildings/create')} style={styles.addButton}>
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <View style={styles.summaryStats}>
          <View style={styles.summaryItem}>
            <Building size={20} color={Colors.primary} />
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summaryLabel}>Tòa nhà</Text>
          </View>
          <View style={styles.summaryItem}>
            <Users size={20} color={Colors.secondary} />
            <Text style={styles.summaryValue}>191</Text>
            <Text style={styles.summaryLabel}>Phòng</Text>
          </View>
          <View style={styles.summaryItem}>
            <DollarSign size={20} color={Colors.success} />
            <Text style={styles.summaryValue}>564M</Text>
            <Text style={styles.summaryLabel}>Doanh thu</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={buildings}
        renderItem={({ item }) => <BuildingCard building={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.buildingList}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={fetchBuildings}
        ListEmptyComponent={
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text>Bạn chưa có toà nhà nào, hãy thêm toà nhà để sử dụng dịch vụ hoặc liên hệ quản trị viên cấp cao</Text>
          </View>
        }
      />
    </View>
  );
}

