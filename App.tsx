
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
import { TokenProvider } from './auth/components/TokenProvider';
import useTokenStorage from './auth/components/hooks/useTokenStorage';
import { IoProvider } from 'socket.io-react-hook';

const Stack = createStackNavigator();

// Create a query client
const queryClient = new QueryClient();
// configure the query client with default options
queryClient.setDefaultOptions({
  // set the default options for mutations
  mutations: {
    // set the default mutation function
    mutationFn: async (data) => {
      // get the token from the useTokenStorage hook
      const { getToken } = useTokenStorage();
      const token = await getToken();
      // define the url of your API endpoint
      const url = 'http://localhost:3222/';
      // define the options for the fetch request
      const options = {
        method: 'POST',
        body: JSON.stringify(data),
        // set the headers with the token
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      // return the fetch request
      return fetch(url, options).then((res) => res.json());
    },
  },
});


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
    <ThemeProvider theme={themeObj}>
      <TokenProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
          {/* <IoProvider> */}
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
              {/* </IoProvider> */}
          </Provider>
        </QueryClientProvider>
      </TokenProvider>
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
