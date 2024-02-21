// This is a simplified example of a login screen component
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {

    const { navigate, reset } = useNavigation(); // Get the navigation props

  const onSubmit = (data) => {
    // Perform the login logic here
    // For simplicity, we assume the user can login with admin/admin
    //if (data.email === 'admin' && data.password === 'admin') {
      // Navigate to the first route in the drawer navigator
      navigate("Incredibles");
      // Reset the navigation state
      reset([{ name: 'Incredibles' }]);
      // Reset the navigation state
    //   navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'incredibles' }],
    //   });
        // } else {
        //   // Show an error message
        //   alert('Invalid email or password');
        // }
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <View>
        <Text>Email</Text>

     
      </View>
      <View>
        <Text>Password</Text>

      
      </View>
      <Button title="Login" onPress={onSubmit} />
    </View>
  );
};

export default LoginScreen;
