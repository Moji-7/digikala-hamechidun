// Import the necessary libraries
import React, { useState, useCallback, useMemo, useContext } from 'react';

import { View, Text, StyleSheet, Linking } from 'react-native';

import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import Commentss from './Commentss';
import Incredibles from './Incredibles';

// Define the components you want to render
const Component1 = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Commentss />
        </View>
    );
};

const Component2 = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Incredibles />
        </View>
    );
};

const Component3 = () => {
    return (
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
            <Text>This is Component 3</Text>
        </View>
    );
};

// Define the HamechdunNavigator component
const HamechdunNavigator = () => {
    //const { item } = useContext(ItemContext);

    // Define a state variable to store the component name
    const [component, setComponent] = useState("Component1");

    // Define a function to handle the button press
    const handlePress = useCallback((name) => {
        setComponent(name);
    }, []);



    interface DataSet {
        title: string;
        name: string;
    }
    const navigator_components: DataSet[] = [
        { title: 'Details info', name: 'Component2' },
        { title: 'Comments DataSet', name: 'Component1' },
        { title: 'Comments AI', name: 'Component3' }
    ];
    // Define an array of the component names
    const components = useMemo(() =>
        navigator_components
        , []);

    // Use React.createElement to create the component based on the state
    const renderedComponent = React.createElement(eval(component));

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Card.Title > Related info 🐣</Card.Title>
                <ListItem.Title>
                    {components.map((navigator_component) => (
                        <Button key={navigator_component.name} title={navigator_component.title}
                            style={buttonStyles.button}
                            onPress={() => handlePress(navigator_component.name)} />
                    ))}
                </ListItem.Title>
            </Card>
            {renderedComponent}
        </View>
    );
};
// Define the styles for the buttons
const buttonStyles = StyleSheet.create({
    button: {
        marginTop: 4,
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 16,
        elevation: 4,
    },
});

export default HamechdunNavigator;
