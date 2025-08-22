import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { Building, Plus, Users, DollarSign, MapPin } from 'lucide-react-native';
import type { Building as BuildingType } from '@/types/property';

const mockBuildings: BuildingType[] = [
  {
    id: '1',
    name: 'Chung cư Sunrise',
    address: '123 Nguyễn Văn Linh, Q.7, TP.HCM',
    admin_id: 'admin1',
    created_at: '2024-01-01T00:00:00Z',
    total_rooms: 120,
    occupied_rooms: 98,
    monthly_revenue: 285000000,
  },
  {
    id: '2',
    name: 'Nhà trọ Happy Home',
    address: '456 Lê Văn Việt, Q.9, TP.HCM',
    admin_id: 'admin1',
    created_at: '2024-03-15T00:00:00Z',
    total_rooms: 24,
    occupied_rooms: 22,
    monthly_revenue: 66000000,
  },
  {
    id: '3',
    name: 'Tòa nhà Blue Sky',
    address: '789 Võ Văn Ngân, Thủ Đức, TP.HCM',
    admin_id: 'admin1',
    created_at: '2024-06-20T00:00:00Z',
    total_rooms: 85,
    occupied_rooms: 71,
    monthly_revenue: 213000000,
  },
];

export default function BuildingsScreen() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getOccupancyRate = (building: BuildingType) => {
    return Math.round((building.occupied_rooms / building.total_rooms) * 100);
  };

  const BuildingCard = ({ building }: { building: BuildingType }) => (
    <TouchableOpacity style={styles.buildingCard}>
      <Image 
        source={{ uri: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400' }}
        style={styles.buildingImage}
      />
      <View style={styles.buildingInfo}>
        <Text style={styles.buildingName}>{building.name}</Text>
        <View style={styles.addressContainer}>
          <MapPin size={14} color={Colors.textMuted} />
          <Text style={styles.buildingAddress} numberOfLines={1}>
            {building.address}
          </Text>
        </View>
        
        <View style={styles.buildingStats}>
          <View style={styles.statItem}>
            <Users size={16} color={Colors.primary} />
            <Text style={styles.statText}>
              {building.occupied_rooms}/{building.total_rooms} phòng
            </Text>
          </View>
          <View style={styles.statItem}>
            <DollarSign size={16} color={Colors.success} />
            <Text style={styles.statText}>
              {formatCurrency(building.monthly_revenue)}
            </Text>
          </View>
        </View>

        <View style={styles.occupancyContainer}>
          <Text style={styles.occupancyLabel}>
            Tỷ lệ lấp đầy: {getOccupancyRate(building)}%
          </Text>
          <View style={styles.occupancyBar}>
            <View 
              style={[
                styles.occupancyFill, 
                { width: `${getOccupancyRate(building)}%` }
              ]} 
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tòa nhà của tôi</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={Colors.background} />
        </TouchableOpacity>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Tổng quan</Text>
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
        data={mockBuildings}
        renderItem={({ item }) => <BuildingCard building={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.buildingList}
        showsVerticalScrollIndicator={false}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summary: {
    backgroundColor: Colors.surface,
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  buildingList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  buildingCard: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buildingImage: {
    width: '100%',
    height: 120,
  },
  buildingInfo: {
    padding: Spacing.md,
  },
  buildingName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  buildingAddress: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
    flex: 1,
  },
  buildingStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: Colors.text,
    marginLeft: Spacing.xs,
  },
  occupancyContainer: {
    marginTop: Spacing.sm,
  },
  occupancyLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  occupancyBar: {
    height: 6,
    backgroundColor: Colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  occupancyFill: {
    height: '100%',
    backgroundColor: Colors.success,
  },
});