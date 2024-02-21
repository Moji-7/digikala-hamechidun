import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Linking, FlatList, GestureResponderEvent } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';

import { useEyeProduct } from '../hooks/useEyeOnProduct';
import { EyeProduct, EyeProductParams } from '../entity/Eye.dto';
import { useQueryClient } from '@tanstack/react-query';


import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, removeAllItem } from '../reduxApi/digikalaSelectedProducts.reducer';
import { useSubmitItemsMutation } from '../reduxApi/api';
import { useAddItemMutation } from '../reduxApi/api2';




const DigikalaSelectedProductSubmitButton: React.FC = () => {
  const dispatch = useDispatch();
  const digikalaSelectedProduct = useSelector((state) => state.digikalaSelectedProducts.digikalaSelectedProducts);
  const [submitItemsApi, { isError, error, isSuccess, data }] = useSubmitItemsMutation();
  // const [addItems] = useAddItemMutation();


  // Use the useCallback hook to memoize the handleSubmit function
  const handleSubmit = async (e) => {
     await submitItemsApi(digikalaSelectedProduct).unwrap();
    
  }


  return (
    <>
      {digikalaSelectedProduct.length > 0 && ( // Render when products exist
        <>
          <Button onPress={handleSubmit} title="😋 Submit" />
          {isError && <Text>Something went wrong! Error: {error.message}</Text>}
          {isSuccess && (
            <Text>{isSuccess}Items submitted successfully! Server response: </Text>
          )}

        </>
      )}
    </>
  );
};
export default DigikalaSelectedProductSubmitButton;