import { View } from 'react-native';
import { HeaderStackComponent } from '@/components/dashboard/stackComponent/HeaderStack';
import { styles } from '@/assets/styles.style';
import React from 'react';
import { BuildingForm } from '@/components/building/BuildingForm';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function create() {
  return (
    <SafeAreaView style={[styles.container, styles.content]}>
      <View style={styles.container}>
        <HeaderStackComponent
        title={"Tạo toà nhà"}
        />
        <BuildingForm type={'create'}/>
      </View>
    </SafeAreaView>
  )
}