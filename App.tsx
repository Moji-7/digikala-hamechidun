
// app.tsx
import 'react-native-gesture-handler';
import { ThemeProvider, createTheme } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import { LogBox, StyleSheet, Text, View } from "react-native";




import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";


import { store } from "./components/reduxApi/store2";
import DrawerMenu from "./DrawerMenu";

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
    myColors: light,
  });

    // Call the ignoreLogs method to suppress the warning
    LogBox.ignoreLogs(['export \'default\' (imported as \'Animated\') was not found in \'react-native-reanimated\'']);
  return (
    // Use the ThemeProvider component to wrap your app and pass the theme object
    <ThemeProvider theme={themeObj}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {/* <NavigationContainer>
           <Stack.Navigator  headerMode="none" initialRouteName="populate" screenOptions={{
            animation: 'slide_from_right',
            gestureEnabled: true,
            statusBarStyle: 'dark'}}>
            <Stack.Screen name="incredibles" component={Incredibles} options={{ headerShown: false }} />
            <Stack.Screen name="populate" component={populate} options={{ headerShown: false }} />
            <Stack.Screen name="EyeProductComponent" component={EyeProductComponent} options={{ headerShown: false }} />
          </Stack.Navigator>
                </NavigationContainer> 
                */}

          <NavigationContainer>
            <DrawerMenu />
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
