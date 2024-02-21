// Import the necessary modules
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, ListItem, Button, Icon, Divider } from "@rneui/themed";

// Import the custom hook
import usePopulateOrderProductPriceExpensive from './hooks/usePopulateOrderProductPriceExpensive';

// Define a component to display the data
const OrderProductPriceExpensive = () => {
  // Use the custom hook to get the data
  const { data, error, isLoading, isError } = usePopulateOrderProductPriceExpensive();

  // Define a function to render each item as a ListItem component
  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.title_fa} ( count:{item.quantity} )</ListItem.Title>
        <ListItem.Subtitle>{item.rrp_price} ( {item.selling_price} | {item.discount_percent}% )
        </ListItem.Subtitle>

      </ListItem.Content>
    </ListItem>
  );

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
          <Card.Title>Populate Price expensive 😎</Card.Title>
          <Card.Divider />
          {/* Use a FlatList component to render the data */}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
          />
        </Card>
      )}
    </View>
  );
};

// Define some styles for the component
const styles = StyleSheet.create({
  container: {
    // flex: 1,
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
export default OrderProductPriceExpensive;
