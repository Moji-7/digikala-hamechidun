import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, FlatList, Animated } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { useEyeProduct } from '../hooks/useEyeOnProduct';
import { EyeProduct, EyeProductParams } from '../entity/Eye.dto';

import { Pagination } from 'react-native-pagination';
import { Alert } from 'react-native';
import AlertComponenti from '../uicomponents/AlertComponent';
import EyeProductAddComponent from './EyeProductAdd';

import { useDispatch, useSelector } from 'react-redux';
import { useGetEyeQuery, useDeleteItemMutation } from '../reduxApi/api';
import PipelinesComponent from './PipelinesComponent';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

interface Props {
    eyeProductParam: EyeProductParams;
}

const EyeProducts: React.FC<Props> = ({ eyeProductParam }) => {
    const { theme } = useTheme();

    const { data, error } = useGetEyeQuery();
    const eyeProducts = useSelector((state) => state.eye.eyeProducts);
    //1- const { data, error,refetch } = useGetEyeQuery();
    //2- const {  eyeProducts } = useGetEyeQuery(undefined, {
    //     selectFromResult: ({ data }) => ({ eyeProducts: data })
    // });


    const [deleteItem, { isLoading, isError }] = useDeleteItemMutation();

    const handleDelete = async (event, productId: number) => {
        event.preventDefault()
        try {
            await deleteItem(productId);
            // refetch();
        } catch (err) {
            console.error('Delete failed', error);
        }

    };
    const showSlice = () => {
        // const eyeProducts2 = useSelector((state) => state.eye.eyeProducts);

    }
    return (


        <Card style={styles.container}>

            {eyeProducts && ( // Render when products exist
                <View style={styles.gridContainer}>
                    <Text>🤑🐾 My Eys: 🤑🐾</Text>
                    {/* <EyeProductAddButton /> */}
                    {eyeProducts.map((eyeProduct, index) => (

                        <ListItem key={eyeProduct.id} style={styles.gridRow}>
                            <ListItem.Content>
                                {/* <ListItem.Title>{eyeProduct.titleFa}</ListItem.Title> */}
                                <ListItem.Subtitle style={styles.gridItem}>
                                    <Button onPress={(e) => handleDelete(e, eyeProduct.id)} title='remove' color={theme.myColors.danger} />
                                    <Divider style={{ width: '100%' }} />
                                    <PipelinesComponent integers={eyeProduct.pipelinesIds.split(",").map(Number)} />
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </View>
            )}
        </Card>

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