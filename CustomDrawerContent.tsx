// This is a simplified example of a custom drawer content component
import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  // useIsDrawerOpen,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import useTokenStorage from './auth/components/hooks/useTokenStorage';

const CustomDrawerContent = (props) => {
  const { navigate, reset } = useNavigation(); // Get the navigation prop
  // const isDrawerOpen = useIsDrawerOpen(); // Get the drawer open state
  const drawerStatus = useDrawerStatus(); // Get the drawer status
  const { getToken,deleteToken } = useTokenStorage();
  const [token, setToken] = useState()


  const showToken = async () => {
    const token = await getToken();
    setToken(token)
    // display the token as an alert
    console.log(token);
  };
  useEffect(() => {
    showToken();
  }, [])


  const handleLogout = async () => {
    // delete the token using the setToken function
    await setToken(undefined);
    await deleteToken();
    navigate("LoginScreen");

    // TODO: navigate to the previous screen using React Navigation
  };

  return (
    <DrawerContentScrollView {...props}>
      {/* Show the user name and a logout button if the drawer is open */}
      {token && (
        <View>
          <Text>Welcome, admin {token}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
      {/* Show the drawer items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
