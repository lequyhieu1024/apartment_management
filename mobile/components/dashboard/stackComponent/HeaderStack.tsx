import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '@/assets/styles.style';
import { Package, Plus } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import React from 'react';
import { BorderRadius, Spacing } from '@/constants/spacing';

export const HeaderStackComponent = ({ iconTitle, title, iconAction }: { iconTitle: any, title: string, iconAction?: any }) => {
  return (
  <View style={style.header}>
    <View style={ styles.flex }>
      {iconTitle}
      <Text style={style.title}>{title}</Text>
    </View>
    <TouchableOpacity style={style.addButton}>
      <Plus size={28} color={Colors.primaryDark} style={{ marginTop: Spacing.sm }} />
    </TouchableOpacity>
  </View>
  );
};

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    marginTop: Spacing.xs,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});