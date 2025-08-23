import * as SecureStore from 'expo-secure-store';

export const saveToken = async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
}

export const getToken = async (key: string): Promise<void> => {
    await SecureStore.getItemAsync(key);
}

export const deleteToken = async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key);
}