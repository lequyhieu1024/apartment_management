import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '@/types/auth';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate login - in real app, this would call your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      let mockUser: User;
      if (email.includes('super')) {
        mockUser = {
          id: '1',
          email,
          name: 'Super Admin',
          role: 'super_admin',
          created_at: new Date().toISOString(),
        };
      } else if (email.includes('admin')) {
        mockUser = {
          id: '2',
          email,
          name: 'Building Admin',
          role: 'admin',
          created_at: new Date().toISOString(),
          subscription_status: 'active',
        };
      } else {
        mockUser = {
          id: '3',
          email,
          name: 'Resident Member',
          role: 'member',
          created_at: new Date().toISOString(),
          building_id: 'building-1',
          room_id: 'room-101',
        };
      }
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(),
        email,
        name,
        role: role as any,
        created_at: new Date().toISOString(),
      };
      
      setUser(newUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

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