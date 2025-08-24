import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { styles } from '@/assets/styles.style';

interface InputFieldProps extends TextInputProps {
  icon?: React.ReactNode;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ icon, error, style, ...props }) => {
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {icon}
        <TextInput
          {...props}
          style={[styles.input, null, style]}
          placeholderTextColor="#999"
        />
      </View>
      {error ? <Text style={styles.errorMsg}>{error}</Text> : null}
    </View>
  );
};