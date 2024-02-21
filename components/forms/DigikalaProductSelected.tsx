import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Linking, FlatList, GestureResponderEvent } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import EyeProductAddButton from './EyeProductAddButton';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../reduxApi/digikalaSelectedProducts.reducer';
// ... (ProductSearch component)

interface Props {
  inputs: any[];
}





const DigikalaProductSelected: React.FC<any> = () => {

  // Use the useDispatch hook to get a reference to the dispatch function
const dispatch = useDispatch();
// Use the useSelector hook to access the items state
const digikalaSelectedProduct = useSelector((state) => state.digikalaSelectedProducts.digikalaSelectedProducts);



// Define a function to handle removing an item
const handleRemoveItem = (id) => {
  // Dispatch the removeItem action with the id as the payload
  dispatch(removeItem(id));
};


  return (
    <>
      {digikalaSelectedProduct.length > 0 && ( // Render when products exist
        <>
          <Text>🤑🐾 Selected Products: 🤑🐾  </Text>
           {/* <EyeProductAddButton /> */}
          {digikalaSelectedProduct.map((product, index) => (

            <ListItem key={product.id}>
              <ListItem.Content>
                <ListItem.Title>{product.title_fa}</ListItem.Title>
                <ListItem.Subtitle>{product.default_variant.seller.title} |
                  {/* {product.default_variant.price.selling_price} |
                  {product.default_variant.price.rrp_price} |
                  {product.default_variant.price.discount_percent}% */}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  <Button onPress={() => handleRemoveItem(product.id)} title='remove' />
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>

          ))}

        </>
      )}
      {digikalaSelectedProduct.length === 0 && <Text>No products selected yet.</Text>}
    </>
  );
}

export default DigikalaProductSelected;
