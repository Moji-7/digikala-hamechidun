// Import the necessary modules
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import useSearchOrderItemParams from './hooks/useSearchOrderItemParams';
import usePopulateOrdersProductsCategoriesInfo from './hooks/usePopulateOrdersProductsCategoriesInfo';
import ListCategoryGrouped from './uicomponents/ListCategoryGrouped';
import { CategorySearchParams, SearchParamsOrderItem, createSearchParamsOrderItem } from './entity/SearchQueries';
import OrderItem from './Orderitem';

import { CategoryGrouped } from './entity/OrdersProductsCategoriesInfo';
interface OrdersProductsCategoriesProps {
    categoryParams: CategorySearchParams;
}

// Move the navigation and UpdateParams declarations to the parent component


const OrdersProductsCategoriesInfo: React.FC<OrdersProductsCategoriesProps> = ({ categoryParams }) => {
    // Use the useTheme hook to get the theme object from RNEUI
    const { theme } = useTheme();

    const [orderGroupedCategory_2, setOrderGroupedCategory_2] = useState<CategoryGrouped[]>([]);
    const [orderGroupedCategory_3, setOrderGroupedCategory_3] = useState<CategoryGrouped[]>([]);
    const [categoryClicked, setCategoryClicked] = useState(false)
    const { searchOrderItemParams, setSearchOrderItemParams } = useSearchOrderItemParams();
    const { data, error, isLoading, isError,getasCache } = usePopulateOrdersProductsCategoriesInfo(categoryParams);

    useEffect(() => {
        setOrderGroupedCategory_2(data?.orderGroupedCategory_2)
        setOrderGroupedCategory_3(data?.orderGroupedCategory_3)
    }, [data]);

    // Define a function that handles the click event on both buttons
    const handleClick = (
        categoryData: CategoryGrouped
    ) => {

       const filtered= getasCache(categoryData,data)
        setOrderGroupedCategory_2(filtered.filterOrderGroupedCategory_2)
        setOrderGroupedCategory_3(filtered.filterOrderGroupedCategory_3)
        setCategoryClicked(true)
        // setSearchOrderItemParams(prevState => {
        //     const { item_category3, ...rest } = prevState;
        //     return {
        //         ...(categoryData.name === "item_category2" ? rest : prevState),
        //         categoryType: categoryData.name,
        //         [categoryData.name]: categoryData.title
        //     };
        // });
        setSearchOrderItemParams(
            createSearchParamsOrderItem({
                categoryType: categoryData.name,
                [categoryData.name]: categoryData.title
            })
        );

    };

    return (
        <View style={styles.container}>
            {isLoading && <Text style={[styles.loading, { color: theme.colors.primary }]}>Loading...</Text>}
            {isError && <Text style={[styles.error, { color: theme.colors.error }]}>Error: {error.message}</Text>}
            {orderGroupedCategory_2 && (
                <>
                    {categoryClicked && <Button onPress={(event) => setOrderGroupedCategory_2(data?.orderGroupedCategory_2)} title={'Return'}></Button>}
                    {orderGroupedCategory_2.map((item, index) => (
                        <ListItem.Subtitle key={index} style={{ borderWidth: 1, borderColor: 'black' }}>
                            <ListCategoryGrouped
                                categoryData={item}
                                handleClick={handleClick}
                            />
                        </ListItem.Subtitle>
                    ))}
                    {categoryClicked && (
                        <>
                            {orderGroupedCategory_3.map((item, index) => (
                                <ListItem.Subtitle key={index} style={{ borderWidth: 1, borderColor: 'black' }}>
                                    <ListCategoryGrouped
                                        categoryData={item}
                                        handleClick={handleClick}
                                    />
                                </ListItem.Subtitle>
                            ))}
                            <OrderItem searchParamsOrderItem={searchOrderItemParams} />
                        </>
                    )}


                </>

            )}

        </View>
    );
};

// Define the styles for the component using StyleSheet
const styles = StyleSheet.create({
    container: {
        //flex: 1,
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
