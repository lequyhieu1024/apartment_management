import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from '@/assets/styles.style';
import { InputField } from '@/components/form/InputField';
import { useRouter } from 'expo-router';
import { IFormType } from '@/interfaces/IFormType';
import { Spacing } from '@/constants/spacing';
import { IBuilding } from '@/interfaces/IBuilding';
import { autoGenerateBuildingCode } from '@/helpers/common';
import { axiosInstance } from '@/libs/axiosInstance';
import * as ImagePicker from 'expo-image-picker';
import { uploadStyles } from '@/assets/uploads.style';

export const BuildingForm = ({ type, data }: IFormType & { data?: IBuilding }) => {
  const [form, setForm] = useState<IBuilding>({
    address: '',
    code: '',
    description: '',
    name: '',
    thumbnail: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const pickThumbnail = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Quyền truy cập',
          'Vui lòng cấp quyền truy cập thư viện ảnh để chọn ảnh.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const uri = asset.uri;
        const name = asset.fileName || `thumbnail.jpg`;
        const mimeType = asset.mimeType || 'image/jpeg';
        await uploadThumbnail(uri, name, mimeType);
      } else {
        Alert.alert('Thông báo', 'Bạn chưa chọn ảnh nào.');
      }
    } catch (error) {
      console.error('Lỗi khi chọn ảnh:', error);
      Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
    }
  };

  const uploadThumbnail = async (uri: string, name: string, mimeType: string) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name,
        type: mimeType,
      } as any);

      const response = await axiosInstance.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status && response.data.data.url) {
        setForm({ ...form, thumbnail: response.data.data.url });
        setErrors((prev) => ({ ...prev, thumbnail: '' }));
      } else {
        throw new Error('Tải ảnh thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi tải ảnh:', error);
      Alert.alert('Lỗi', 'Không thể tải ảnh lên. Vui lòng thử lại.');
      setErrors((prev) => ({ ...prev, thumbnail: 'Không thể tải ảnh lên.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name) {
      newErrors.name = 'Vui lòng nhập tên tòa nhà!';
    } else if (form.name.length <= 3) {
      newErrors.name = 'Tên tòa nhà phải dài hơn 3 ký tự!';
    }

    if (!form.thumbnail) {
      newErrors.thumbnail = 'Vui lòng chọn ảnh thumbnail!';
    }

    if (!form.address) {
      newErrors.address = 'Vui lòng nhập địa chỉ!';
    }

    if (!form.description) {
      newErrors.description = 'Vui lòng nhập mô tả!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      try {
        const payload = { ...form, code: autoGenerateBuildingCode() };
        const res = await axiosInstance.post('/admin/buildings', payload);
        if (res.data.status) {
          Alert.alert('Thành công', 'Tạo tòa nhà mới thành công!');
          router.back();
        }
      } catch (error: any) {
        const formatted: { [key: string]: string } = {};
        Object.keys(error.errors || {}).forEach((field) => {
          formatted[field] = error.errors[field][0];
        });
        setErrors(formatted);
        Alert.alert('Lỗi', 'Không thể tạo tòa nhà. Vui lòng kiểm tra lại.');
      } finally {
        setIsLoading(false);
      }
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

          {/* Thumbnail section */}
          <View style={uploadStyles.thumbnailContainer}>
            {form.thumbnail ? (
              <View style={{ alignItems: 'center', width: '100%' }}>
                <Image
                  source={{ uri: process.env.EXPO_PUBLIC_ASSETS_URL + form.thumbnail }}
                  style={{ width: '100%', height: 200, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <TouchableOpacity
                  style={uploadStyles.uploadButton}
                  onPress={pickThumbnail}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={uploadStyles.uploadButtonText}>Thay ảnh Thumbnail</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ alignItems: 'center', width: '100%' }}>
                <View style={uploadStyles.placeholderContainer}>
                  <Text style={uploadStyles.placeholderText}>
                    Chưa có ảnh Thumbnail
                  </Text>
                </View>
                <TouchableOpacity
                  style={uploadStyles.uploadButton}
                  onPress={pickThumbnail}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Text style={uploadStyles.uploadButtonText}>Chọn ảnh Thumbnail</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
            {errors.thumbnail && (
              <Text style={uploadStyles.errorText}>{errors.thumbnail}</Text>
            )}
          </View>

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
            style={[
              styles.registerButton,
              isLoading && styles.registerButtonDisabled,
              { marginTop: 24 },
            ]}
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
};