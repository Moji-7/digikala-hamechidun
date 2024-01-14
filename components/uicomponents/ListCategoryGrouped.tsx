import React, { useEffect, useState } from 'react';
interface ListItemComponentProps {
  categoryType: string
  categoryGrouped: CategoryGrouped;
  index: number;
}
import { View, Text, StyleSheet } from 'react-native';

import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { CategoryGrouped } from '../entity/OrdersProductsCategoriesInfo ';
import { useNavigation } from "@react-navigation/native";
import { SearchParamsOrderItem, createSearchParamsOrderItem } from '../entity/SearchQueries';
import CategoryTitles from './CategoryTitles';


const ListCategoryGrouped: React.FC<ListItemComponentProps> = ({ categoryType, categoryGrouped, index }) => {

  const navigation = useNavigation();

  // Define a generic type that represents the property name and value
  type UpdateParams = {
    prop: keyof SearchParamsOrderItem;
    value: SearchParamsOrderItem[keyof SearchParamsOrderItem];
  };

  const [searchParamsInstance, setSearchParamsInstance] = useState(
    createSearchParamsOrderItem({
      categoryType: categoryType,
      allOrderItems: true,
    })
  );
  useEffect(() => {
    // Check if the categoryType prop is not null or undefined
    if (categoryType != null) {
      // Set the searchParamsInstance[categoryType] property to the categoryGrouped.title value
      setSearchParamsInstance((prevState) => ({
        ...prevState,
        [categoryType]: categoryGrouped.title,
      }));
    }
  }, [categoryType]);

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

      <ListItem key={index} bottomDivider>
        <ListItem.Content>
          <ListItem.Title >
            <Button
              title={`🥵 ${categoryGrouped.title} (${categoryGrouped.count})`}
              onPress={handleClick}
            />
          </ListItem.Title>
          <ListItem.Subtitle >
          
            <Card>
  
              <Card.Title>Avg Price: {categoryGrouped.avgPrice}</Card.Title>
              <Card.Title>Total Price: {categoryGrouped.totalPrice}</Card.Title>
              <Card.Title>Avg Discount: {categoryGrouped.avgDiscount}</Card.Title>
            </Card>
          </ListItem.Subtitle>
          <ListItem.Subtitle >
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Button
              title={`Max Paid 🤐: ${categoryGrouped.maxPrice}`}
              onPress={() => handleClick({ prop: 'selling_price', value: categoryGrouped.maxPrice })}
            />
          </ListItem.Subtitle>
          {/* <ListItem.Subtitle>
            <Button
              title={`Max Repeat Repeat 🤐: ${categoryGrouped.maxPrice}`}
              onPress={() => handleClick({ prop: 'selling_price', value: categoryGrouped.maxPrice })}
            />
          </ListItem.Subtitle> */}
          <ListItem.Subtitle>
            <CategoryTitles categoryTitles={categoryGrouped.childs} />
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};


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


export default ListCategoryGrouped;