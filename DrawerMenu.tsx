import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';


import populatetest from "./components/populatetest";

import populate from "./components/populate";
import Orderitem from "./components/Orderitem";
import Incredibles from "./components/Incredibles";
import Comments from "./components/Comments";


import IncrediblesWithOtherSellers from "./components/IncrediblesWithOtherSellers";
import LoginScreen from "./auth/components/LoginScreen"

import Ionicons from 'react-native-vector-icons/Ionicons'; // You can use any icon library you like
import CustomDrawerContent from './CustomDrawerContent';


const Drawer = createDrawerNavigator();

function DrawerMenu() {
    return (
        <Drawer.Navigator
   
        initialRouteName="incredibles"
        drawerContent={(props) => <CustomDrawerContent {...props} />} // Pass the custom drawer content component

            drawerContentOptions={{
                activeTintColor: '#e91e63', // Customize menu item colors
                itemStyle: styles.drawerItem, // Apply custom styles
            }}>
                
            <Drawer.Screen name="LoginScreen" component={LoginScreen} />
            <Drawer.Screen
                name="Home"
                component={populate}
                options={{
                    drawerIcon: ({ focused, size, color }) => (
                        <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Incredibles"
                component={Incredibles}
                options={{
                    drawerIcon: ({ focused, size, color }) => (
                        <Ionicons name={focused ? 'ios-star' : 'ios-star-outline'} size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Comments"
                component={Comments}
                options={{
                    drawerIcon: ({ focused, size, color }) => (
                        <Ionicons name={focused ? 'ios-chatbubble' : 'ios-chatbubble-outline'} size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="populat etest"
                component={populatetest}
                options={{
                    drawerIcon: ({ focused, size, color }) => (
                        <Ionicons name={focused ? 'award' : 'ios-more-award'} size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Incredibles WithOther"
                component={IncrediblesWithOtherSellers}
                options={{
                    drawerIcon: ({ focused, size, color }) => (
                        <Ionicons name={focused ? 'barcode' : 'barcode-outline'} size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
// other icons:

// Certainly! I can suggest some alternative icons other than the ones you're currently using in your menu items. Here are some options based on the icon names you provided:

// For "Home":

// ios-home (from Ionicons)
// home (from Material Community Icons)
// house (from FontAwesome)
// compass (from Material Community Icons)
// map (from Material Community Icons)
// For "Incredibles":

// ios-lightning (from Ionicons)
// rocket (from Material Community Icons)
// star (from FontAwesome)
// award (from Material Community Icons)
// medal (from Material Community Icons)
// For "Product Details":

// ios-cart (from Ionicons)
// tag-outline (from Material Community Icons)
// eye (from Material Community Icons)
// box (from Material Community Icons)
// barcode (from Material Community Icons)

const styles = StyleSheet.create({
    drawerItem: {
        // Add your custom drawer item styles here (e.g., padding, margin)
    },
});

export default DrawerMenu;
