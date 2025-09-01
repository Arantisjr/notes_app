import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";

// Import the image with type assertion
const react_image = require('../assets/images/notes.png') as ImageSourcePropType;

const HomeScreen: React.FC = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image source={react_image} style={styles.image} />
            <Text style={styles.title}>Welcome to notes app.</Text>
            <Text style={styles.subtitle}>Capture your thoughts anytime, anywhere</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { router.push('/notes'); }}
            >
                <Text style={styles.buttonText}>
                    Get started
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: "bold",
    }
});

export default HomeScreen;