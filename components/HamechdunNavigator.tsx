// Import the necessary libraries
import React, { useState, useCallback, useMemo, useContext } from 'react';

import { View, Text, StyleSheet, Linking } from 'react-native';

import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import Comments from './Comments';
import Incredibles from './Incredibles';
import { HamechidunContext } from './IncrediblesWithOtherSellers';


// Define the components you want to render
const Component1 = () => {
    const { productId } = useContext(HamechidunContext);
    return (

        <View style={{ flex: 1, backgroundColor: 'red' }}>
            {/* productId={productId} */}
            <Comments productId={productId} />
        </View>
    );
};

const Component2 = () => {
    const { productId } = useContext(HamechidunContext);
    return (
        <View style={{ flex: 1, backgroundColor: 'green' }}>
            salam
            {/* <Incredibles productId={productId} /> */}
        </View>
    );
};

const Component3 = () => {
    const { productId } = useContext(HamechidunContext);
    return (
        <View style={{ flex: 1, backgroundColor: 'blue' }}>
            {/* <CommentsAi productId={productId} /> */}
        </View>
    );
};

// Define the HamechdunNavigator component
const HamechdunNavigator = () => {


    // Define a state variable to store the component name
    const [component, setComponent] = useState(null);

    interface DataSet {
        title: string;
        name: string;
    }
    const navigator_components: DataSet[] = [
        { title: 'Details info', name: 'Component2' },
        { title: 'other Sellers', name: 'Component2' },
        { title: 'Comments DataSet', name: 'Component1' },
        { title: 'Comments AI', name: 'Component3' },
        { title: 'other product Dataset', name: 'Component2' },
        { title: 'other product AI', name: 'Component2' },
        { title: 'tTorob info', name: 'Component2' },


    ];

    const handlePress = useCallback((name) => {
        setComponent(name);
    }, []);

    // Define an array of the component names
    const components = useMemo(() =>
        navigator_components
        , []);

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
            {component && React.createElement(eval(component))}
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
