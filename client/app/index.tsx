import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter, useSegments } from 'expo-router';

export default function Index() {
    const { user, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        // Redirect based on authentication status
        if (!user) {
            router.replace('/(auth)/login');
        } else {
            router.replace('/(tabs)/notes');
        }
    }, [user, isLoading]);

    return null; // This screen doesn't render anything, just handles routing
}