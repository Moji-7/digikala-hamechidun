import OrdersSummary from './OrdersSummary';
import OrdersSellersMost from './OrdersSellersMost';
import OrdersProductsMost from './OrdersProductsMost';
import OrderProductPriceExpensive from './OrderProductPriceExpensive';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // You can use any icon library you like

const populate = () => {
  // Use useQuery instead of useQueries, and pass the custom hook as the query function
  const Tab = createBottomTabNavigator();

  return (
    // No need for another NavigationContainer here
    <Tab.Navigator
      initialRouteName="OrdersSummary"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'OrdersSummary') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'OrdersSellersMost') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'OrderProductPriceExpensive') {
            iconName = focused ? 'mail' : 'mail-outline';
          }else if (route.name === 'OrdersProductsMost') {
            iconName = focused ? 'mail' : 'mail-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="OrdersSummary"
        component={OrdersSummary}
        options={{
          tabBarLabel: 'Home',
          // You can use a custom component for the tab button
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              // You can add some extra functionality or style here
              onPress={() => {
                console.log('Home tab pressed');
                props.onPress();
              }}
              style={{ backgroundColor: 'white' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersSellersMost"
        component={OrdersSellersMost}
        options={{
          tabBarLabel: 'About',
          // You can also pass some extra props to the tab button component
          // tabBarButton: {
          //   // For example, you can change the accessibility label
          //   : 'About this app',
          // },
        }}
      />
      <Tab.Screen
        name="OrderProductPriceExpensive"
        component={OrderProductPriceExpensive}
        options={{
          tabBarLabel: "", // You can hide the label by setting it to null
        }}
      />
       <Tab.Screen
        name="OrdersProductsMost"
        component={OrdersProductsMost}
        options={{
          tabBarLabel: "", // You can hide the label by setting it to null
        }}
      />
    </Tab.Navigator>
  );
};
export default populate;

