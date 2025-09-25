import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="notes"
                options={{
                    title: 'Notes',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                    headerShown: true, // Show header for notes screen
                }}
            />
            <Tabs.Screen
                name="editor"
                options={{
                    title: 'Editor',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="create" size={size} color={color} />
                    ),
                    headerShown: true, // Show header for editor screen
                }}
            />
        </Tabs>
    );
}