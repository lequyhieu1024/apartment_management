import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '@/assets/styles.style';
import { ChevronLeft } from 'lucide-react-native';
import React, { ReactNode } from 'react';
import { headerStackStyle } from '@/assets/headerStack.style';
import { router } from 'expo-router';

export const HeaderStackComponent = (
  { iconTitle, title, iconAction, action }: { iconTitle?: ReactNode, title: string, iconAction?: ReactNode, action?: () => void }
) => {
  return (
    <View style={headerStackStyle.header}>
      <View style={styles.flex}>
        {iconTitle ?? <ChevronLeft onPress={() => router.back()} size={30}/>}
        <Text style={headerStackStyle.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={action} style={headerStackStyle.addButton}>
        {iconAction}
      </TouchableOpacity>
    </View>
  );
};