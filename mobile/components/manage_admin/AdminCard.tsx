import { convertDate, formatCurrency, getStatusBadgeStyle, getStatusLabel } from '@/helpers/common';
import { Text, TouchableOpacity, View } from 'react-native';
import { Building, CircleAlert as AlertCircle, CreditCard } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import React from 'react';
import { styles } from '@/assets/manageAdmin.style';
import { IAdmin } from '@/interfaces/IAdmin';

export const AdminCard = ({ admin }: { admin: IAdmin }) => {
  const statusStyle = getStatusBadgeStyle(admin.status);

  return (
    <TouchableOpacity style={styles.adminCard}>
      <View style={styles.adminHeader}>
        <View style={styles.adminBasicInfo}>
          <Text style={styles.adminName}>{admin.name}</Text>
          <Text style={styles.adminEmail}>{admin.email}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {getStatusLabel(admin.status)}
          </Text>
        </View>
      </View>

      <View style={styles.adminStats}>
        <View style={styles.statItem}>
          <Building size={16} color={Colors.primary} />
          <Text style={styles.statText}>{admin.buildings_count} tòa nhà</Text>
        </View>
        <View style={styles.statItem}>
          <CreditCard size={16} color={Colors.success} />
          <Text style={styles.statText}>{formatCurrency(admin?.monthly_fee)}/tháng</Text>
        </View>
      </View>

      <View style={styles.adminFooter}>
        <Text style={styles.lastPayment}>
          Thanh toán cuối: {convertDate(admin.last_payment)}
        </Text>
        {admin.status === 'inactive' && (
          <View style={styles.warningContainer}>
            <AlertCircle size={14} color={Colors.error} />
            <Text style={styles.warningText}>Cần thanh toán để tiếp tục</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};