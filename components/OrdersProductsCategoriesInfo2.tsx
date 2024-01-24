// Import the necessary modules
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Divider, useTheme } from '@rneui/themed';

import usePopulateOrdersProductsCategoriesInfo from './hooks/usePopulateOrdersProductsCategoriesInfo';
import ListCategoryGrouped from './uicomponents/ListCategoryGrouped';
import { CategorySearchParams } from './entity/SearchQueries';
import ListCategoryGrouped2 from './uicomponents/ListCategoryGrouped2';
// import ListCategoryGrouped2 from './uicomponents/ListCategoryGrouped2';
interface OrdersProductsCategoriesProps {
    categoriesValue: CategorySearchParams;
  }
// Define the component for rendering the UI of calling the custom hook
    const OrdersProductsCategoriesInfo2: React.FC<OrdersProductsCategoriesProps> = ({ categoriesValue }) => {
    // Use the useTheme hook to get the theme object from RNEUI
    // Use the useTheme hook to get the theme object from RNEUI
    const { theme } = useTheme();
    // Use the custom hook to get the data, error, isLoading, and isError properties from the query
    const { data, error, isLoading, isError } = usePopulateOrdersProductsCategoriesInfo(categoriesValue);
    // Use the useTheme hook to get the theme object from RNEUI
    // Return a JSX element that renders the UI based on the query state and data
    return (
        <View style={styles.container}>salam
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
                                        <ListCategoryGrouped2 key={index} categoryType='item_category2' categoryValues={{item_category2:item.title}}categoryGrouped={item} index={index} />
                                    </ListItem.Subtitle>
                                ))}
                               
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                 
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
export default OrdersProductsCategoriesInfo2;
