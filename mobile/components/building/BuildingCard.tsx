import { IBuilding } from '@/interfaces/IBuilding';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { DollarSign, MapPin, Users } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { formatCurrency, getOccupancyRate } from '@/helpers/common';
import React from 'react';
import { styles } from '@/assets/building.style';

export const BuildingCard = ({ building }: { building: IBuilding }) => (
  <TouchableOpacity style={styles.buildingCard}>
    <Image
      source={{ uri: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400' }}
      style={styles.buildingImage}
    />
    <View style={styles.buildingInfo}>
      <Text style={styles.buildingName}>{building?.name}</Text>
      <View style={styles.addressContainer}>
        <MapPin size={14} color={Colors.textMuted} />
        <Text style={styles.buildingAddress} numberOfLines={1}>
          {building?.address}
        </Text>
      </View>

      <View style={styles.buildingStats}>
        <View style={styles.statItem}>
          <Users size={16} color={Colors.primary} />
          <Text style={styles.statText}>
            {building?.occupied_rooms}/{building?.total_rooms} phòng
          </Text>
        </View>
        <View style={styles.statItem}>
          <DollarSign size={16} color={Colors.success} />
          <Text style={styles.statText}>
            {formatCurrency(building?.monthly_revenue)}
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