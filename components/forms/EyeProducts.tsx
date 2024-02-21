import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, FlatList } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { useEyeProduct } from '../hooks/useEyeOnProduct';
import { EyeProduct, EyeProductParams } from '../entity/Eye.dto';
import { useQueryClient } from '@tanstack/react-query';

import { Pagination } from 'react-native-pagination';
import { Alert } from 'react-native';
import AlertComponenti from '../uicomponents/AlertComponent';
import EyeProductAddComponent from './EyeProductAdd';
import { useSelector } from 'react-redux';
import { useDeleteItemMutation } from '../reduxApi/api';




interface Props {
    eyeProductParam: EyeProductParams;
}

const EyeProducts: React.FC<Props> = ({ eyeProductParam }) => {
    const { theme } = useTheme();
    const queryClient = useQueryClient();

    const [deleteItem, { isLoading, isError, error }] = useDeleteItemMutation();

    const eyeProductsItems = useSelector((state) => state.eyeProducts.eyeProducts)
    
    //delete
    const handleDelete = async (event, productId: number) => {
        event.preventDefault()
        try {
            await deleteItem(productId);
            // Handle success (e.g., show a notification)
        } catch (err) {
            // Handle error (e.g., show an error message)
            console.error('Delete failed', error);
        }
    
    };

    return (
        <View style={styles.container}>
   {JSON.stringify(useSelector((state) => state.eyeProducts), null, 2)}

            {eyeProductsItems.length > 0 && ( // Render when products exist
                <>
                    <Text>🤑🐾 Selected Products: 🤑🐾  </Text>
                    {/* <EyeProductAddButton /> */}
                    {eyeProductsItems.map((eyeProduct, index) => (

                        <ListItem key={eyeProduct.id}>
                            <ListItem.Content>
                                <ListItem.Title>{eyeProduct.titleFa}</ListItem.Title>
                                <ListItem.Subtitle>{eyeProduct.pipelinesIds} |
                                </ListItem.Subtitle>
                                <ListItem.Subtitle>
                                    <Button onPress={(e) => handleDelete(e,eyeProduct.id)} title='remove' />
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>

                    ))}
                </>
            )}

        </View>

        //     {data && (
        //         <View style={styles.gridContainer}>
        //             {data.eyeProducts.map((eyeProduct, index) => (
        //                 <View key={index} style={styles.gridRow}>
        //                     {renderGridItem(eyeProduct, index)}
        //                 </View>
        //             ))}
        //         </View>
        //     )}
        // </View>
  
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    gridItem: {
        //width: '48%', // Adjust based on GRID_COLUMN_COUNT and desired proportions
        padding: 8,
        marginRight: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    gridItemTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    gridItemInfo: {
        fontSize: 16,
        marginBottom: 8,
    },
    gridItemCreatedAt: {
        fontSize: 14,
        color: '#888',
    },
    loading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    error: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default EyeProducts;