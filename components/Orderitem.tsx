// Import the necessary modules
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ListCategoryGrouped from './uicomponents/ListCategoryGrouped';
import { useCat } from './hooks/usecat';
import { Card, useTheme } from '@rneui/themed';
import OrderItemOne from './uicomponents/OrderItemOne';
import { SearchParamsOrderItem } from './entity/SearchQueries';
const OrderItem = ({ route }) => {
    // Use the useTheme hook to get the theme object
    const { theme } = useTheme();
    // Use the route.params property to get the item that was passed from the previous screen
    const params = route.params as SearchParamsOrderItem;;

    const { data, error, isLoading, isError } = useCat(params);
    // Render the UI of the detail screen
    return (

        <View style={styles.container}>
            <Card>
                <Card.Title style={{ color: theme.colors.text }}> Category {params.categoryType} 🛒🐾</Card.Title>
                {/* <ListCategoryGrouped key={index} categoryType='item_category2' categoryGrouped={categoryGrouped} index={index} /> */}
            </Card>
            {isLoading && (
                <Text style={[styles.loading, { color: theme.colors.primary }]}>
                    Loading...
                </Text>
            )}
            {isError && (
                <Text style={[styles.error, { color: theme.colors.error }]}>
                    Error: {error.message}
                </Text>
            )}
            {data && (
                <Card>
                    <Card.Title style={{ color: theme.colors.text }}> Order Item (category 2 & 3) 🛒🐾</Card.Title>
                    <Card.Divider />
                    {data.map((item, index) => (
                        <>
                            <OrderItemOne key={index} orderItem={item} />
                        </>
                    ))}
                </Card>
            )}

        </View>
    );
};
// Define the styles for the component using StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    error: {
        fontSize: 20,
        fontWeight: "bold",
    },
    dataContainer: {
        margin: 10,
    },
    dataTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 5,
    },
    dataSubtitle: {
        fontSize: 16,
        marginVertical: 5,
    },
});

// Export the component
export default OrderItem;