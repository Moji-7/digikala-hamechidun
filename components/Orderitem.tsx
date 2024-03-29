// Import the necessary modules
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ListCategoryGrouped from './uicomponents/ListCategoryGrouped';
import { useCat } from './hooks/usecat';
import { Card, useTheme } from '@rneui/themed';
import OrderItemOne from './uicomponents/OrderItemOne';
import { SearchParamsOrderItem } from './entity/SearchQueries';
// import OrdersProductsCategoriesInfo from './OrdersProductsCategoriesInfo';
import OrdersProductsCategoriesInfo2 from './OrdersProductsCategoriesInfo2';
import OrdersProductsCategoriesInfo from './OrdersProductsCategoriesInfo';


interface SearchParamsOrderItemProps {
    searchParamsOrderItem: SearchParamsOrderItem;
}
const OrderItem: React.FC<SearchParamsOrderItemProps> = ({ searchParamsOrderItem }) => {
    // Use the useTheme hook to get the theme object
    const { theme } = useTheme();

    const params = searchParamsOrderItem as SearchParamsOrderItem;;
    // useLayoutEffect(() => {
    //     console.log(params);
    // }, [params]);
   // console.log(params)
    const { data, error, isLoading, isError } = useCat(params);

    return (

        <View style={styles.container}>
            <Card>


                {/* {data.orderGroupedCategory_3.map((item, index) => (
                    <ListCategoryGrouped key={index} categoryType='item_category3' categoryGrouped={item} index={index} />
                ))} */}
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


            {

                data && (
                    <Card>

                        <Text style={[styles.dataTitle, { color: theme.colors.text }]}>Category 3 🦚🦚</Text>

                        <Card.Title style={{ color: theme.colors.text }}> Order Item (details) 🛒🐾</Card.Title>
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