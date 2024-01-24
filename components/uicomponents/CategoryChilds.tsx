
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

import { ICategoryChilds } from '../entity/OrdersProductsCategoriesInfo';
import { CategorySearchParams, SearchParamsOrderItem, createSearchParamsOrderItem } from '../entity/SearchQueries';
import CategoryButton from './CategoryButton';

interface CategoryTitlesProps {
    categoryChilds: ICategoryChilds[];
    handleClick: (
        event: React.MouseEvent,
        categoryData:any
        ) => void;
}


const CategoryChilds: React.FC<CategoryTitlesProps> = ({ categoryChilds,handleClick }) => {

    const theme = useTheme();
    //const navigation = useNavigation();

   
    // Define a generic type that represents the property name and value
    // type UpdateParams = {
    //     prop: keyof SearchParamsOrderItem;
    //     value: SearchParamsOrderItem[keyof SearchParamsOrderItem];
    // };

    


    // // Define a function that handles the click event on both buttons
    // const handleClick = (event: React.MouseEvent, updateParams: UpdateParams) => {
    //     event.preventDefault();
    //     // Update the searchParamsInstance state variable with the property name and value
    //     setSearchParamsInstance((prevState) => ({
    //         ...prevState,
    //         [updateParams.prop]: updateParams.value,
    //     }));

   // };
    // when the searchParamsInstance state changes
    // useEffect(() => {
    //     navigation.navigate('orderitem', searchParamsInstance);
    // }, [searchParamsInstance]);

    return (
        <>
            {/* <Text style={styles.title}>Items {categoryChilds.parent}</Text> */}
            {categoryChilds && (
                <>
                    {categoryChilds.map((item, index) => (
                        <ListItem key={index}>
                            <ListItem.Content>
                                <ListItem.Title >
                                    <Button
                                       title={`🥵 ${item.title} (${item.count})`}
                                       onPress={(event) => handleClick(item )}
                                    />
                               
                                </ListItem.Title>

                                <Divider />
                                <ListItem.Subtitle >
                                    <Text>Total Price: {item.total_price}</Text>
                                </ListItem.Subtitle>

                            </ListItem.Content>
                        </ListItem>
                    ))}
                </>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default CategoryChilds;
