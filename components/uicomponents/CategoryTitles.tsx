
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

import { ICategoryTitles } from '../entity/OrdersProductsCategoriesInfo ';
import { SearchParamsOrderItem, createSearchParamsOrderItem } from '../entity/SearchQueries';

interface CategoryTitlesProps {
    categoryTitles: ICategoryTitles[];
}


const CategoryTitles: React.FC<CategoryTitlesProps> = ({ categoryTitles }) => {

    const theme = useTheme();
    const navigation = useNavigation();

    // Define a generic type that represents the property name and value
    type UpdateParams = {
        prop: keyof SearchParamsOrderItem;
        value: SearchParamsOrderItem[keyof SearchParamsOrderItem];
    };

    const [searchParamsInstance, setSearchParamsInstance] = useState(
        createSearchParamsOrderItem({
            categoryType: "item_category2",//categoryType,
            allOrderItems: true,
        })
    );
    //   useEffect(() => {
    //     // Check if the categoryType prop is not null or undefined
    //     if (categoryType != null) {
    //       // Set the searchParamsInstance[categoryType] property to the categoryGrouped.title value
    //       setSearchParamsInstance((prevState) => ({
    //         ...prevState,
    //         [categoryType]: categoryGrouped.title,
    //       }));
    //     }
    //   }, [categoryType]);

    // Define a function that handles the click event on both buttons
    const handleClick = (updateParams: UpdateParams) => {
        // Update the searchParamsInstance state variable with the property name and value
        setSearchParamsInstance((prevState) => ({
            ...prevState,
            [updateParams.prop]: updateParams.value,
        }));

    };
    // when the searchParamsInstance state changes
    useEffect(() => {
        navigation.navigate('orderitem', searchParamsInstance);
    }, [searchParamsInstance]); // Pass the searchParamsInstance state as a dependency

    return (
        <>
            {/* <Text style={styles.title}>Items {categoryTitles.parent}</Text> */}
            {categoryTitles && (
                <>
                    {categoryTitles.map((item, index) => (
                        <ListItem key={index}>
                            <ListItem.Content>
                                <ListItem.Title >
                                    <Button onPress={() => handleClick({ prop: 'item_category3', value: item.title })}>{item.title} ({item.count}) </Button>
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

export default CategoryTitles;
