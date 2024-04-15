import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Card, Avatar, useTheme, Icon, Divider } from '@rneui/themed'; // Assuming useScrapedData is a custom hook
import { useNavigation } from '@react-navigation/native';


interface NavigateButtonProps {
    title: string;
    screen: string;
    params: string;

}

const NotificationNavigateButton: React.FC<NavigateButtonProps> = ({ title, params, screen }) => {

    const navigation = useNavigation();

    const navigateTo = () => {
        navigation.navigate('otherStacks', {
            screen: screen,
            params: params
        });
    };

    return (
        <Text style={styles.textStyle}>
            <Button title={title} onPress={navigateTo} />
        </Text>
    );
};

// Remember to define your styles
const styles = {
    textStyle: {
        // ... your style properties
    }
};



export default NotificationNavigateButton;
