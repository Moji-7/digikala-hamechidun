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
import { Provider } from "react-redux";

import populate from "./components/populate";
import Orderitem from "./components/Orderitem";
import Incredibles from "./components/Incredibles";
import Comments from "./components/Comments";

import IncrediblesWithOtherSellers from "./components/IncrediblesWithOtherSellers";
import EyeProductComponent from "./components/forms/EyeProduct";
import { store } from "./components/reduxApi/store";

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
    alert: "#ff0000",
  success: "#00ff00",
  danger: "#ff00ff",
    secondary: "#000000",
    // ... other colors
  };
  const light = {
    primary: "#000000",
    alert: "#ff0000",
    success: "#00ff00",
    danger: "#ff00ff",
    secondary: "#ffffff",
    // ... other colors
  };
  // Use the isDarkMode value to choose the appropriate color object
  const themeObj = createTheme({
    myColors:light,
  });

  return (
    // Use the ThemeProvider component to wrap your app and pass the theme object
    <ThemeProvider theme={themeObj}>
      <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="comments" component={EyeProductComponent} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
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
