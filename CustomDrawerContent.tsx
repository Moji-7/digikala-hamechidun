// This is a simplified example of a custom drawer content component
import React from 'react';
import { View, Text, Button } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
 // useIsDrawerOpen,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const navigation = useNavigation(); // Get the navigation prop
 // const isDrawerOpen = useIsDrawerOpen(); // Get the drawer open state
  const drawerStatus = useDrawerStatus(); // Get the drawer status

  const handleLogout = () => {
    // Perform the logout logic here
    // For simplicity, we assume the user can logout without any confirmation
    // Navigate to the login screen
    navigation.navigate('login');
    // Reset the navigation state
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
    // Close the drawer
    //navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Show the user name and a logout button if the drawer is open */}
      {2==2 && (
        <View>
          <Text>Welcome, admin</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
      {/* Show the drawer items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
