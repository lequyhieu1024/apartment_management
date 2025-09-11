import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { styles } from '@/assets/styles.style';
import { InputField } from '@/components/form/InputField';
import { useRouter } from 'expo-router';
import { IFormType } from '@/interfaces/IFormType';
import { Spacing } from '@/constants/spacing';
import { IBuilding } from '@/interfaces/IBuilding';

export const BuildingForm = ({ type, data }: IFormType & { data?: IBuilding }) => {
  const [form, setForm] = useState<IBuilding>({
    address: '',
    code: '',
    created_at: '',
    description: '',
    id: '',
    monthly_revenue: 0,
    name: '',
    occupied_rooms: 0,
    owner: undefined,
    owner_user_id: undefined,
    thumbnail: '',
    total_rooms: 0,
    updated_at: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (type === 'edit' && data) {
  //     setForm({
  //       name: data.name || '',
  //       thumbnail: data.thumbnail || '',
  //       code: data.code || '',
  //       address: data.address || '',
  //       owner_user_id: data.owner_user_id || '',
  //       description: data.description || '',
  //     });
  //   }
  // }, [type, data]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name) {
      newErrors.name = 'Vui lòng nhập tên tòa nhà!';
    } else if (form.name.length <= 3) {
      newErrors.name = 'Tên tòa nhà phải dài hơn 3 ký tự!';
    }

    if (!form.thumbnail) {
      newErrors.thumbnail = 'Vui lòng nhập đường dẫn ảnh thumbnail!';
    }

    if (!form.code) {
      newErrors.code = 'Vui lòng nhập mã tòa nhà!';
    } else if (form.code.length <= 2) {
      newErrors.code = 'Mã tòa nhà phải dài hơn 2 ký tự!';
    }

    if (!form.address) {
      newErrors.address = 'Vui lòng nhập địa chỉ!';
    }

    if (!form.owner_user_id) {
      newErrors.owner_user_id = 'Vui lòng nhập ID chủ sở hữu!';
    } else if (isNaN(Number(form.owner_user_id)) || Number(form.owner_user_id) <= 0) {
      newErrors.owner_user_id = 'ID chủ sở hữu phải là số dương hợp lệ!';
    }

    if (!form.description) {
      newErrors.description = 'Vui lòng nhập mô tả!';
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
        <View style={[styles.stackForm]}>
          <InputField
            placeholder="Tên tòa nhà"
            value={form.name}
            onChangeText={(text: string) => {
              setForm({ ...form, name: text });
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            style={styles.input}
          />

          <InputField
            placeholder="Đường dẫn ảnh thumbnail"
            value={form.thumbnail}
            onChangeText={(text: string) => {
              setForm({ ...form, thumbnail: text });
              setErrors((prev) => ({ ...prev, thumbnail: '' }));
            }}
            error={errors.thumbnail}
            style={styles.input}
          />

          <InputField
            placeholder="Mã tòa nhà"
            value={form.code}
            onChangeText={(text: string) => {
              setForm({ ...form, code: text });
              setErrors((prev) => ({ ...prev, code: '' }));
            }}
            error={errors.code}
            style={styles.input}
          />

          <InputField
            placeholder="Địa chỉ"
            value={form.address}
            onChangeText={(text: string) => {
              setForm({ ...form, address: text });
              setErrors((prev) => ({ ...prev, address: '' }));
            }}
            error={errors.address}
            style={styles.input}
          />

          <InputField
            placeholder="Mô tả"
            value={form.description}
            onChangeText={(text: string) => {
              setForm({ ...form, description: text });
              setErrors((prev) => ({ ...prev, description: '' }));
            }}
            multiline
            numberOfLines={12}
            error={errors.description}
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}