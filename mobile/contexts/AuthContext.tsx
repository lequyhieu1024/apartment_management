import React, {createContext, useContext, useState, useEffect} from 'react';
import {AuthState, User} from '@/types/auth';
import {axiosInstance} from "@/libs/axiosInstance";
import {Alert} from "react-native";
import {getToken, saveToken} from "@/libs/authStore";

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (email: string, password: string, name: string, role: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async (email: string, password: string): Promise<void> => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.post("/auth/login", { email, password });
            if (res.data.status) {
                setUser(res.data.data.user);
                await saveToken(process.env.EXPO_PUBLIC_TOKEN_KEY!, res.data.data.token);
            } else {
                throw { type: "server", message: res.data.message || "Đăng nhập thất bại" };
            }
        } catch (error: any) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, name: string, role: string) => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.post("/auth/register", { email, password, name, role });

            if (res.data.status) {
                setUser(res.data.data);
            } else {
                throw { type: "server", message: "Đăng nhập thất bại" };
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    // const loadInitialUser = async () => {
    //     try {
    //         const token = await getToken(process.env.EXPO_PUBLIC_TOKEN_KEY!);
    //         if (token) {
    //             const res = await axiosInstance.get("/auth/me");
    //             if (res.data.status) {
    //                 setUser(res.data.data.user);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Load initial user error:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    //
    // useEffect(() => {
    //     loadInitialUser();
    // }, []);

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};