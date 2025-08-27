import { ScrollView, View } from 'react-native';
import { PackageForm } from '@/components/dashboard/servicePackage/PackageForm';
import { HeaderStackComponent } from '@/components/dashboard/stackComponent/HeaderStack';
import { Plus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { styles } from '@/assets/styles.style';
import React from 'react';

export default function create() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <HeaderStackComponent
          iconTitle={<Plus size={24} color={Colors.primaryDark} />}
          title={"Tạo gói dịch vụ"}
        />
        <PackageForm type={'create'}/>
      </View>
    </ScrollView>
  )
}