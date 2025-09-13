import { IBuilding } from '@/interfaces/IBuilding';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Copy, MapPin, Users } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { getOccupancyRate } from '@/helpers/common';
import React from 'react';
import { styles } from '@/assets/building.style';
import * as Clipboard from "expo-clipboard";

export const BuildingCard = ({ building }: { building: IBuilding }) => {

  const copyToClipboard = async () => {
    if (building?.code) {
      await Clipboard.setStringAsync(building.code);
      Alert.alert("Đã sao chép", `Mã tòa nhà ${building.code} đã được copy.`);
    }
  };

  return (
    <TouchableOpacity style={styles.buildingCard}>
      <Image
        source={{ uri: building.thumbnail ? process.env.EXPO_PUBLIC_ASSETS_URL + building.thumbnail : 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400' }}
        style={styles.buildingImage}
      />
      <View style={styles.buildingInfo}>
        <View style={styles.buildingStats}>
          <Text style={styles.buildingName}>{building?.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.buildingName}>{building?.code}</Text>
            <TouchableOpacity onPress={copyToClipboard} style={{ marginLeft: 8 }}>
              <Copy size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
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
              {building?.occupied_rooms ?? 0}/{building?.total_rooms ?? 0} phòng
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
  )
};