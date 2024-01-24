import React, { useEffect, useLayoutEffect, useState } from 'react';
interface ListItemComponentProps {
  categoryData: any;
  handleClick: (
    event: React.MouseEvent,
    categoryData: any
  ) => void;
}
import { View, Text, StyleSheet } from 'react-native';

import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { CategoryGrouped } from '../entity/OrdersProductsCategoriesInfo';
import { useNavigation } from "@react-navigation/native";
import { CategorySearchParams, SearchParamsOrderItem, createSearchParamsOrderItem } from '../entity/SearchQueries';
import CategoryChilds from './CategoryChilds';


const ListCategoryGrouped: React.FC<ListItemComponentProps> = ({ categoryData, handleClick }) => {

  return (
    <>

      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title >
            <Button key={categoryData.title}
              title={`🥵 ${categoryData.title} (${categoryData.count})`}
              onPress={(event) => handleClick(categoryData)}
            />
           
          </ListItem.Title>
          <ListItem.Subtitle >
            <Card>
              <Card.Title>Avg Price: {categoryData.avgPrice}</Card.Title>
              <Card.Title>Total Price: {categoryData.totalPrice}</Card.Title>
              <Card.Title>Avg Discount: {categoryData.avgDiscount}</Card.Title>
            </Card>
          </ListItem.Subtitle>
          <ListItem.Subtitle >
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <Button
              title={`Max Paid 🤐: ${categoryData.maxPrice}`}
              onPress={() => handleClick({ prop: 'selling_price', value: categoryData.maxPrice })}
            />
          </ListItem.Subtitle>
          <ListItem.Subtitle>
          <CategoryChilds categoryChilds={categoryData.childs} handleClick={handleClick} />
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