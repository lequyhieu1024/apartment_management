import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '@/assets/styles.style';
import { Plus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import React, { ReactNode } from 'react';
import { Spacing } from '@/constants/spacing';
import { headerStackStyle } from '@/assets/headerStack.style';

export const HeaderStackComponent = (
  { iconTitle, title, iconAction, action }: { iconTitle: ReactNode, title: string, iconAction?: ReactNode, action?: () => void }
) => {
  return (
    <View style={headerStackStyle.header}>
      <View style={styles.flex}>
        {iconTitle}
        <Text style={headerStackStyle.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={action} style={headerStackStyle.addButton}>
        {iconAction}
      </TouchableOpacity>
    </View>
  );
};