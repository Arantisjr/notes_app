import React, { useState, useEffect, createContext, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, signup as apiSignup } from '../services/api';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const userData = await AsyncStorage.getItem('userData');

            if (userToken && userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        try {
            const response = await apiLogin(email, password);
            const { token, user } = response.data;

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(user));

            setUser(user);
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || 'Login failed'
            };
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const response = await apiSignup(email, password);
            const { token, user } = response.data;

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(user));

            setUser(user);
            return { success: true };
        } catch (error: any) {
            return {
                success: false,
                error: error.response?.data?.error || 'Signup failed'
            };
        }
    };

    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userData');
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const value: AuthContextType = {
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            </AuthContext.Provider>
    );
};