import { Text, View, StyleSheet, Image } from "react-native";
import react_image from '../assets/images/react-logo.png'
export default function HomeScreen() {
  return (
    <View
      style={styles.container}
    >
        <Image source={react_image} style={styles.image} />
        <Text styles={styles.title}>Welcome to notes app.</Text>
        <Text styles={styles.subtitle}>Capture your thoughts anytime, anywhere</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding:20,
        backgroundColor: "#fff",
    },
    image: {
        width:100,
        height:100,
        marginBottom:20,
        borderRadius:10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom:10,
        color:'#333',
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom:20,
    }
})