import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        if (!email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setIsLoading(true);
        const result = await signIn(email, password);
        setIsLoading(false);

        if (!result.success) {
            Alert.alert('Login Failed', result.error || 'Please check your credentials and try again');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Header with Logo */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="document-text" size={80} color="#007AFF" />
                    </View>
                    <Text style={styles.title}>Notes App</Text>
                    <Text style={styles.subtitle}>Your thoughts, organized</Text>
                </View>

                {/* Login Form */}
                <View style={styles.formContainer}>
                    <Text style={styles.formTitle}>Welcome Back</Text>

                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email address"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            autoComplete="email"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoComplete="password"
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Ionicons name="refresh" size={20} color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.signupLink}
                        onPress={() => router.push('/(auth)/signup')}
                    >
                        <Text style={styles.signupText}>
                            Don't have an account? <Text style={styles.signupHighlight}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>© 2024 Notes App</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 40,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#e7f3ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    formTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 15,
        height: 55,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1a1a1a',
        height: '100%',
    },
    eyeIcon: {
        padding: 5,
    },
    loginButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        gap: 10,
    },
    loginButtonDisabled: {
        backgroundColor: '#ccc',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    signupLink: {
        alignItems: 'center',
    },
    signupText: {
        color: '#666',
        fontSize: 14,
    },
    signupHighlight: {
        color: '#007AFF',
        fontWeight: '600',
    },
    footer: {
        marginTop: 'auto',
        alignItems: 'center',
        paddingVertical: 20,
    },
    footerText: {
        color: '#999',
        fontSize: 12,
    },
});