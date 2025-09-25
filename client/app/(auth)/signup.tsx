import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleSignup = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        if (!email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        const result = await signUp(email, password);
        setIsLoading(false);

        if (!result.success) {
            Alert.alert('Signup Failed', result.error || 'Please try again with different credentials');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="document-text" size={60} color="#007AFF" />
                    </View>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join us to organize your thoughts</Text>
                </View>

                {/* Signup Form */}
                <View style={styles.formContainer}>
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
                            autoComplete="new-password"
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

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="#999"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            autoComplete="new-password"
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
                        onPress={handleSignup}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Ionicons name="refresh" size={20} color="#fff" />
                        ) : (
                            <Text style={styles.signupButtonText}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginLink}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.loginText}>
                            Already have an account? <Text style={styles.loginHighlight}>Sign in</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>By signing up, you agree to our Terms and Privacy Policy</Text>
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
        marginTop: 40,
        marginBottom: 30,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e7f3ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        height: 50,
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
    signupButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        gap: 10,
    },
    signupButtonDisabled: {
        backgroundColor: '#ccc',
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    loginLink: {
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginHighlight: {
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
        textAlign: 'center',
    },
});