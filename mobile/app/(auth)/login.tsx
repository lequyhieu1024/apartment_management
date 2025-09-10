import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { Spacing, BorderRadius } from '@/constants/spacing';
import { LogIn, Mail, Lock, Unlock } from 'lucide-react-native';
import { styles } from '@/assets/styles.style';
import { InputField } from '@/components/form/InputField';
import { InputPassword } from '@/components/form/InputPassword';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

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

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(form.email, form.password);
      router.replace('/(tabs)');
    } catch (error: any) {
      if (error.type === "validation") {
        const formatted: { [key: string]: string } = {};
        Object.keys(error.errors).forEach((field) => {
          formatted[field] = error.errors[field][0];
        });
        setErrors(formatted);
      } else {
        Alert.alert("Đăng nhập thất bại", error.message || "Có lỗi xảy ra");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    router.push('/(auth)/register');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <LogIn size={48} color={Colors.primary} />
          <Text style={styles.title}>Quản lý phòng trọ</Text>
          <Text style={styles.subtitle}>Quản lý phòng trọ & Chợ chung cư</Text>
        </View>

        <View style={styles.form}>
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

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToRegister}>
            <Text style={styles.registerText}>
              Chưa có tài khoản? <Text style={styles.registerLink}>Đăng ký ngay</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demoAccounts}>
          <Text style={styles.demoTitle}>Demo Accounts:</Text>
          <Text style={styles.demoText}>Super Admin: super@admin.com</Text>
          <Text style={styles.demoText}>Admin: admin@building.com</Text>
          <Text style={styles.demoText}>Member: member@resident.com</Text>
          <Text style={styles.demoText}>Password: password123</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}