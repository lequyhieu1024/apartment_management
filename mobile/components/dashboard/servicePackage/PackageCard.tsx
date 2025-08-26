import { Text, TouchableOpacity, View } from 'react-native';
import { Building, CircleCheck as CheckCircle, ListChecksIcon } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import React from 'react';
import { IPackage } from '@/interfaces/IPackage';
import { styles } from '@/assets/styles.style';
import { convertDate, convertToInt, parseJson } from '@/helpers/common';
import { SaleTypeVi } from '@/enums/common';

export const PackageCard = ({packageData}: { packageData: IPackage }) => {
  return (
    <TouchableOpacity style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View style={styles.adminInfo}>
          <Text style={styles.adminName}>{packageData.name}</Text>
          <Text style={styles.adminEmail}>Cập nhật lần cuối: {convertDate(packageData.updated_at)}</Text>
        </View>
      </View>

      <View style={styles.paymentDetails}>
        <View style={styles.paymentAmount}>
          <Text style={styles.amountLabel}>Giá tiền:</Text>
          <Text style={styles.amountValue}>{convertToInt(packageData.price)}/tháng</Text>
        </View>
        <View style={styles.paymentPeriod}>
          <Text style={styles.periodLabel}>Thanh toán 1 năm:</Text>
          <Text style={styles.periodValue}>- {convertToInt(packageData.sale) + SaleTypeVi[packageData.sale_type]}</Text>
        </View>
      </View>

      <View style={styles.paymentFooter}>
        <View style={styles.adminInfo}>

          <Text style={styles.adminName}><ListChecksIcon size={14} color={Colors.textMuted}/> Đặc quyền:</Text>

          <View style={styles.featuresWrapper}>
            {Object.entries(packageData.features).map(([key, value]) => (
              <View key={key} style={styles.featureItem}>
                <Text style={styles.keyText} numberOfLines={2}>
                  - {key}:
                </Text>
                <Text style={styles.valueText} numberOfLines={2}>
                  {value}
                </Text>
              </View>
            ))}
          </View>

        </View>
      </View>


      <View style={styles.paidInfo}>
        <CheckCircle size={14} color={Colors.success}/>
        <Text style={styles.paidText}>
          Số lượt đã đăng ký: 0
        </Text>
      </View>
    </TouchableOpacity>
  );
};