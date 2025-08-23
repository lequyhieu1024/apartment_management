import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Lock, Unlock } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { styles } from '@/assets/styles.style';

interface InputFieldProps extends TextInputProps {
  icon?: React.ReactNode;
  error?: string;
  secureToggle?: boolean;
}

export const InputPassword: React.FC<InputFieldProps> = ({
                                                           icon,
                                                           error,
                                                           secureToggle = true,
                                                           style,
                                                           secureTextEntry,
                                                           ...props
                                                         }) => {
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={{ marginBottom: 12 }}>
      <View style={styles.inputContainer}>
        {icon || (
          <TouchableOpacity onPress={() => setHidden(!hidden)}>
            {hidden ? (
              <Lock size={20} color={Colors.textSecondary} style={styles.inputIcon} />
            ) : (
              <Unlock size={20} color={Colors.textSecondary} style={styles.inputIcon} />
            )}
          </TouchableOpacity>
        )}
        <TextInput
          {...props}
          secureTextEntry={secureToggle ? hidden : secureTextEntry}
          style={[styles.input, style]}
          placeholderTextColor={Colors.textMuted}
        />
      </View>
      {error && <Text style={styles.errorMsg}>{error}</Text>}
    </View>
  );
};