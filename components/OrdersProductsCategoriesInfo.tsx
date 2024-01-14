// Import the necessary modules
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Divider, useTheme } from '@rneui/themed';

import usePopulateOrdersProductsCategoriesInfo from './hooks/usePopulateOrdersProductsCategoriesInfo';
import ListCategoryGrouped from './uicomponents/ListCategoryGrouped';

// Define the component for rendering the UI of calling the custom hook
const OrdersProductsCategoriesInfo = () => {
    // Use the useTheme hook to get the theme object from RNEUI
    const { theme } = useTheme();
    // Use the custom hook to get the data, error, isLoading, and isError properties from the query
    const { data, error, isLoading, isError } = usePopulateOrdersProductsCategoriesInfo();
    // Use the useTheme hook to get the theme object from RNEUI
    // Return a JSX element that renders the UI based on the query state and data
    return (
        <View style={styles.container}>
            {/* Show a loading text while the data is being fetched */}
            {isLoading && <Text style={[styles.loading, { color: theme.colors.primary }]}>Loading...</Text>}
            {/* Show an error text if there is an error */}
            {isError && <Text style={[styles.error, { color: theme.colors.error }]}>Error: {error.message}</Text>}
            {/* Show a card with the data if the data is available */}
            {data && (
                <>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title style={{ color: theme.colors.text }}>
                                Orders Categories Grouping (category 2 & 3) 🛒🐾
                            </ListItem.Title>
                            <ListItem.Subtitle  >


                                {data.orderGroupedCategory_2.map((item, index) => (
                                    <ListItem.Subtitle style={{ borderWidth: 1, borderColor: 'black' }}>
                                        <ListCategoryGrouped key={index} categoryType='item_category2' categoryGrouped={item} index={index} />
                                    </ListItem.Subtitle>
                                ))}


                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    {/* <Card.Title style={{ color: theme.colors.text }}> Orders Categories Grouping (category 2 & 3) 🛒🐾</Card.Title>
                    <Card.Divider /> */}
                    {/* <View style={styles.dataContainer}>
                        <Text style={[styles.dataTitle, { color: theme.colors.text }]}>Category 2 🐠🐠</Text>
                        <Divider style={styles.dataDivider} />
                       
                        <Text style={[styles.dataTitle, { color: theme.colors.text }]}>Category 3 🦚🦚</Text>
                        <Divider style={styles.dataDivider} />
                        {data.orderGroupedCategory_3.map((item, index) => (
                            <ListCategoryGrouped key={index} categoryType='item_category3' categoryGrouped={item} index={index} />
                        ))}
                    </View> */}
                </>

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
    dataDivider: {
        marginVertical: 5,
    },
});

// Export the component
export default OrdersProductsCategoriesInfo;
