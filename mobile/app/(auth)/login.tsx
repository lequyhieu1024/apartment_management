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
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Thất bại', 'Vui lòng nhập đủ thông tin đăng nhập !');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error: any) {
      setErrorMsg(error.message);
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
          <Text style={styles.title}>PropertyHub</Text>
          <Text style={styles.subtitle}>Quản lý phòng trọ & Chợ chung cư</Text>
        </View>

        <View style={styles.form}>
          <InputField
            icon={<Mail size={20} color={Colors.textSecondary} style={styles.inputIcon} />}
            placeholder="Email"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              setEmailError('');
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            error={emailError}
          />

          <InputPassword
            placeholder="Mật khẩu"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
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