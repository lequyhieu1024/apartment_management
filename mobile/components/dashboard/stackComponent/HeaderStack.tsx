import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '@/assets/styles.style';
import { Plus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import React from 'react';
import { Spacing } from '@/constants/spacing';
import { headerStackStyle } from '@/assets/headerStack.style';

export const HeaderStackComponent = ({ iconTitle, title, iconAction }: { iconTitle: any, title: string, iconAction?: any }) => {
  return (
  <View style={headerStackStyle.header}>
    <View style={ styles.flex }>
      {iconTitle}
      <Text style={headerStackStyle.title}>{title}</Text>
    </View>
    <TouchableOpacity style={headerStackStyle.addButton}>
      <Plus size={28} color={Colors.primaryDark} style={{ marginTop: Spacing.sm }} />
    </TouchableOpacity>
  </View>
  );
};