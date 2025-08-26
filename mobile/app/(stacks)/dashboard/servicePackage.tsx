import { View, Text, ScrollView, FlatList } from 'react-native';
import { styles } from '@/assets/styles.style';
import React from 'react';
import { mockPackage } from '@/interfaces/IPackage';
import { PackageCard } from '@/components/dashboard/servicePackage/PackageCard';
import { HeaderStackComponent } from '@/components/dashboard/stackComponent/HeaderStack';
import { Package } from 'lucide-react-native';
import { Colors } from '@/constants/colors';

export default function ServicePackageStack() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <HeaderStackComponent iconTitle={<Package size={24} color={Colors.primaryDark} />} title={'Danh sách dịch vụ'} />
        <FlatList
          data={mockPackage}
          renderItem={({item}) => <PackageCard packageData={item}/>}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}