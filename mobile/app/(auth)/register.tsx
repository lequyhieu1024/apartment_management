import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView, Alert
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { UserPlus, Mail, User } from 'lucide-react-native';
import { styles } from '@/assets/styles.style';
import { InputField } from '@/components/form/InputField';
import { InputPassword } from '@/components/form/InputPassword';

export default function RegisterScreen() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const roles = [
    { value: 'admin', label: 'Admin (Chủ tòa nhà)' },
    { value: 'member', label: 'Member (Cư dân)' }
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.name) {
      newErrors.name = 'Vui lòng nhập họ và tên!';
    } else if (form.name.length <= 5) {
      newErrors.name = 'Họ và tên phải dài hơn 5 ký tự!';
    }

    if (!form.email) {
      newErrors.email = 'Vui lòng nhập email!';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Vui lòng nhập địa chỉ email hợp lệ!';
    }

    if (!form.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu!';
    } else if (form.password.length <= 6) {
      newErrors.password = 'Mật khẩu phải dài hơn 6 ký tự!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register(form.email, form.password, form.name, form.role);
      router.replace('/(auth)/login');
    } catch (error: any) {
      if (error.type === "validation") {
        const formatted: { [key: string]: string } = {};
        Object.keys(error.errors).forEach((field) => {
          formatted[field] = error.errors[field][0];
        });
        setErrors(formatted);
      } else {
        Alert.alert("Đăng ký thất bại", error.message || "Có lỗi xảy ra");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <UserPlus size={48} color={Colors.primary} />
          <Text style={styles.title}>Đăng ký tài khoản</Text>
          <Text style={styles.subtitle}>Tạo tài khoản mới để sử dụng PropertyHub</Text>
        </View>

        <View style={styles.form}>
          <InputField
            icon={<User size={20} color={Colors.textSecondary} style={styles.inputIcon} />}
            placeholder="Họ và tên"
            value={form.name}
            onChangeText={(text: string) => {
              setForm({ ...form, name: text });
              setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
          />

          <InputField
            icon={<Mail size={20} color={Colors.textSecondary} style={styles.inputIcon} />}
            placeholder="Email"
            value={form.email}
            onChangeText={(text: string) => {
              setForm({ ...form, email: text });
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <InputPassword
            placeholder="Mật khẩu"
            value={form.password}
            onChangeText={(text) => {
              setForm({ ...form, password: text });
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
            error={errors.password}
            secureToggle={true}
          />

          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Loại tài khoản:</Text>
            {roles.map((roleOption) => (
              <TouchableOpacity
                key={roleOption.value}
                style={[
                  styles.roleOption,
                  form.role === roleOption.value && styles.roleOptionSelected
                ]}
                onPress={() => setForm({ ...form, role: roleOption.value })}
              >
                <Text
                  style={[
                    styles.roleOptionText,
                    form.role === roleOption.value && styles.roleOptionTextSelected
                  ]}
                >
                  {roleOption.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.loginText}>
              Đã có tài khoản? <Text style={styles.loginLink}>Đăng nhập ngay</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
