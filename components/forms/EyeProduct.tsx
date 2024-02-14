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




interface Props {
    eyeProductParam: EyeProductParams;
}

const EyeProductComponent: React.FC<Props> = ({ eyeProductParam }) => {

    const { theme } = useTheme();

    const queryClient = useQueryClient();

    const { data, error, isLoading, isError, deleteMutation, addMutation } = useEyeProduct(eyeProductParam, queryClient);


    const [page, setPage] = useState(1);

    // Define a function to update the page number when the user navigates to a different page
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleDelete = async (event, productId: number) => {
        event.preventDefault()
        try {
            const result = await deleteMutation.mutateAsync(productId);
            console.log('Delete successful', result);
        } catch (error) {
            console.error('Delete failed', error);
        }
    };



    // const handleDelete = (productId) => {
    //     await deletee(productId);
    //   };
    const renderGridItem = (eyeProduct: EyeProduct, index: number) => (
        <View style={styles.gridItem} key={index}>
            <Text style={styles.gridItemTitle}>{eyeProduct.productTitle}</Text>
            <Text style={styles.gridItemInfo}>{eyeProduct.info}</Text>
            <Button onPress={(e) => handleDelete(e, eyeProduct.productId)} key={eyeProduct.productId} title={'Delete'}
                color={theme.myColors.danger}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {data && (
                <View style={styles.gridContainer}>
                    {data.eyeProducts.map((eyeProduct, index) => (
                        <View key={index} style={styles.gridRow}>
                            {renderGridItem(eyeProduct, index)}
                        </View>


                        //     <FlatList
                        //     data={data.eyeProducts}
                        //     renderItem={({ item, index }) => renderGridItem(item, index)} // Use your own renderGridItem function
                        //     keyExtractor={(item) => item.id}
                        //     // Render the Pagination component at the bottom of the FlatList component
                        //     ListFooterComponent={
                        //         <Pagination
                        //             pageCount={data?.count}
                        //             activePage={page}
                        //             onPageChange={handlePageChange}
                        //             // containerStyle={PaginationContainerStyle}

                        //         />

                        //     }
                        // />

                    ))}
                    <Divider />
                    <EyeProductAddComponent eyeProductParam={eyeProductParam} />


                </View>
            )}
        </View>
    );
};

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

export default EyeProductComponent;
