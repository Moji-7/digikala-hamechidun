// Import the necessary modules
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, ListItem, Button, Icon, Divider } from "@rneui/themed";

import usePopulateOrdersSummary from "./hooks/usePopulateOrdersSummary";

// Define a custom hook to fetch the data from the API

// Define a component to display the data
const OrdersSummary = () => {
    // Use the custom hook to get the data
    const { data, error, isLoading, isError } = usePopulateOrdersSummary();

    // Render the component
    return (
        <View style={styles.container}>
            {/* Show a loading indicator while the data is being fetched */}
            {isLoading && <Text style={styles.loading}>Loading...</Text>}
            {/* Show an error message if the fetch failed */}
            {isError && <Text style={styles.error}>Error: {error.message}</Text>}
            {/* Show the data if the fetch succeeded */}
            {data && (
                <Card>
                    <Card.Title>Populate Orders Summary 🤑🐾</Card.Title>
                    <Card.Divider />
                    {/* Use a View component to wrap the data */}
                    <View style={styles.dataContainer}>
                        {/* Use a Text component to display the order ID */}
                        <Text style={styles.dataTitle}>Order ID: {data.id}</Text>
                        {/* Use a Divider component to separate the data */}
                        <Divider style={styles.dataDivider} />
                        {/* Use a ListItem component to display the sum price */}
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Sum Price</ListItem.Title>
                                <ListItem.Subtitle>{data.orders_sum_price}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        {/* Use a ListItem component to display the max price */}
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Max Price</ListItem.Title>
                                <ListItem.Subtitle>{data.orders_max_price}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        {/* Use a ListItem component to display the average price */}
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Average Price</ListItem.Title>
                                <ListItem.Subtitle>{data.orders_average_price}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                        {/* Use a ListItem component to display the count */}
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>Count</ListItem.Title>
                                <ListItem.Subtitle>{data.orders_count}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    </View>
                </Card>
            )}


        </View>
    );
};

// Define some styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loading: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
    },
    error: {
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
    },
});

// Export the component
export default OrdersSummary;
