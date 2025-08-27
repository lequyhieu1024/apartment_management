import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Building, Cast, CreditCard, ListChecksIcon, Package } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import React, { useState, useEffect } from 'react';
import { styles } from '@/assets/styles.style';
import { InputField } from '@/components/form/InputField';
import { useRouter } from 'expo-router';
import { IFormType } from '@/interfaces/IFormType';
import { Spacing } from '@/constants/spacing';
import { IPackage } from '@/interfaces/IPackage';

export const PackageForm = ({ type, data }: IFormType & { data?: IPackage }) => {
  const [form, setForm] = useState({
    name: '',
    features: {},
    price_month: 0,
    price_year: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (type === 'edit' && data) {
      setForm({
        name: data.name || '',
        features: data.features || '',
        price_month: data.price_month || 0,
        price_year: data.price_year || 0,
      });
    }
  }, [type, data]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name) {
      newErrors.name = 'Vui lòng nhập tên gói!';
    } else if (form.name.length <= 3) {
      newErrors.name = 'Tên gói phải dài hơn 3 ký tự!';
    }

    if (!form.features) {
      newErrors.features = 'Vui lòng nhập tính năng!';
    } else {
      try {
        JSON.parse(form.features);
      } catch (e) {
        newErrors.features = 'Tính năng phải là JSON hợp lệ!';
      }
    }

    if (!form.price_month) {
      newErrors.price_month = 'Vui lòng nhập giá tháng!';
    } else if (isNaN(Number(form.price_month)) || Number(form.price_month) <= 0) {
      newErrors.price_month = 'Giá tháng phải là số dương hợp lệ!';
    }

    if (!form.price_year) {
      newErrors.price_year = 'Vui lòng nhập giá năm!';
    } else if (isNaN(Number(form.price_year)) || Number(form.price_year) <= 0) {
      newErrors.price_year = 'Giá năm phải là số dương hợp lệ!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsLoading(true);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView contentContainerStyle={{ paddingTop: Spacing.sm }}>
        <View style={[styles.paymentCard]}>
          <InputField
            placeholder="Tên gói"
            value={form.name}
            onChangeText={(text: string) => {
              setForm({ ...form, name: text });
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            style={styles.input}
          />

          <InputField
            placeholder="Giá tháng"
            value={form.price_month}
            onChangeText={(text: string) => {
              setForm({ ...form, price_month: text });
              setErrors((prev) => ({ ...prev, price_month: '' }));
            }}
            keyboardType="numeric"
            error={errors.price_month}
            style={styles.input}
          />

          <InputField
            placeholder="Giá năm"
            value={form.price_year}
            onChangeText={(text: string) => {
              setForm({ ...form, price_year: text });
              setErrors((prev) => ({ ...prev, price_year: '' }));
            }}
            keyboardType="numeric"
            error={errors.price_year}
            style={styles.input}
          />

          <InputField
            placeholder="Tính năng"
            value={form.features}
            onChangeText={(text: string) => {
              setForm({ ...form, features: text });
              setErrors((prev) => ({ ...prev, features: '' }));
            }}
            multiline
            numberOfLines={12}
            error={errors.features}
            style={[styles.input, { height: 250, textAlignVertical: 'top', paddingTop: 12 }]}
          />


          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled, { marginTop: 24 }]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Đang xử lý...' : type === 'edit' ? 'Lưu' : 'Tạo mới'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
            <Text style={[styles.loginText, styles.registerLink]}>Trở lại</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};