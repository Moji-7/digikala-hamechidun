import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Linking, FlatList, GestureResponderEvent } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button, Icon } from '@rneui/themed';
import { useEyeProduct } from '../hooks/useEyeOnProduct';
import { EyeProduct, EyeProductParams } from '../entity/Eye.dto';
import { useQueryClient } from '@tanstack/react-query';


import { Alert } from 'react-native';

import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from '../reduxApi/eyeProductsSelected.reducer';

interface Props {
    digikalaProduct: any
}
const EyeProductAddButton: React.FC<Props> = (digikalaProduct) => {

    // Use the useDispatch hook to get a reference to the dispatch function
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        //   if (!digikalaSelectedProduct.some((item) => item.id === product.id))
        //       setDigikalaSelectedProduct([...digikalaSelectedProduct, product]);
        console.log(digikalaProduct.digikalaProduct)
        dispatch(addItem(digikalaProduct.digikalaProduct));
        //  console.log(`Adding product ${product.id} to cart`);

    };

    // Render the items list
    return (
        <>
            <Icon
                name="add-shopping-cart"
                type="ionicon"
                onPress={() => handleAddToCart()}
            />
        </>
    );
}


//     const { theme } = useTheme();
//     const queryClient = useQueryClient();

//     const { data, error, isLoading, isError, deleteMutation, addMutation } = useEyeProduct(undefined, queryClient);

//     const handleAdd = async () => {
//         //const result = await addMutation.mutateAsync(formData);
//         Alert.alert("Success", "The eye product was added successfully", [
//             { text: "OK", onPress: () => console.log("OK Pressed") },
//         ]);
//         console.log('The eye product was added successfully', result);
//     }
//     return (
//             <Button onPress={() => handleAdd()} key={'addEyeBtn'} title='Add to my Favorite'
//                 // disabled={Object.keys(validationErrors || {}).length > 0}
//             />
//     );
// };



export default EyeProductAddButton;
