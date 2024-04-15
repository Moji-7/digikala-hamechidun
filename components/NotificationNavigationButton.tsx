
import React from 'react';
import { Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Define the props type for the component
interface NavigateButtonProps {
  title: string;
  productId: number;
  screen: string;
}

// Create the functional component
const NotificationNavigationButton: React.FC<NavigateButtonProps> = ({ title, productId, screen }) => {
  const navigation = useNavigation();

  const navigateTo = () => {
    navigation.navigate('otherStacks', {
      screen: screen,
      params: { searchParamsProductPrice: { product_id: productId } }
    });
  };

  return (
    <Text style={styles.textStyle}>
      🎈click <Button title={title} onPress={navigateTo} />
    </Text>
  );
};

// Remember to define your styles
const styles = {
  textStyle: {
    // ... your style properties
  }
};

export default NotificationNavigationButton;

