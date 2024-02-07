// app.tsx
import { ThemeProvider, createTheme } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StyleSheet, Text, View } from "react-native";


import populatetest from "./components/populatetest";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import populate from "./components/populate";
import Orderitem from "./components/Orderitem";
import Incredibles from "./components/Incredibles";
import Comments from "./components/Comments";

import IncrediblesWithOtherSellers from "./components/IncrediblesWithOtherSellers";

const Stack = createStackNavigator();
// Create a query client
const queryClient = new QueryClient();

export default function App() {
  // Use createTheme to generate a theme object with your custom colors
  // Use the useDarkMode hook to get the current mode
  const isDarkMode = true;
  // Define the dark and light objects with your custom color values
  const dark = {
    primary: "#ffffff",
    secondary: "#000000",
    // ... other colors
  };
  const light = {
    primary: "#000000",
    secondary: "#ffffff",
    // ... other colors
  };
  // Use the isDarkMode value to choose the appropriate color object
  const themeObj = createTheme({
    myColors: isDarkMode ? dark : light,
  });

  return (
    // Use the ThemeProvider component to wrap your app and pass the theme object
    <ThemeProvider theme={themeObj}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen name="populatetest" component={populatetest} />
            <Stack.Screen name="orderitem" component={Orderitem} /> */}
            {/* <Stack.Screen name="incredibles" component={Incredibles} /> */}
            <Stack.Screen name="incrediblesWithProducts" component={IncrediblesWithOtherSellers} />
            <Stack.Screen name="comments" component={Comments} /> 
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
