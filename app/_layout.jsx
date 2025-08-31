import { Stack } from "expo-router";
import HomeScreen from "@/app/index";

export default function RootLayout() {
  return ( <Stack
  screenOptions={{
      headerStyle:{
          backgroundColor: "#ff8c00"
      },
      headerTintColor: "white",
      headerTitleStyle:{
          fontSize: 20,
          fontWeight: "bold",
      },
      contentStyle:{
          paddingHorizontal:10,
          paddingTop:10,
          backgroundColor: "white"

      }
  }}
  >
      <Stack.Screen name="index" options={{title: "Home"}} />
  </Stack>);
}


// you use Stack if you use multiple pages and Slot a single page application