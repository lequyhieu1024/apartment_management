import { View, Text, ScrollView, FlatList } from 'react-native';
import { styles } from '@/assets/styles.style';
import React from 'react';
import { mockPackage } from '@/interfaces/IPackage';
import { PackageCard } from '@/components/dashboard/servicePackage/PackageCard';
import { HeaderStackComponent } from '@/components/dashboard/stackComponent/HeaderStack';
import { Package, Plus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { router } from 'expo-router';

export default function List() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <HeaderStackComponent
          iconTitle={<Package size={24} color={Colors.primaryDark} />}
          title={'Danh sách dịch vụ'}
          iconAction={<Plus size={28} color={Colors.primaryDark} style={{ marginTop: Spacing.sm }} />}
          action={() => router.push('/(stacks)/dashboard/service/create')}
        />
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