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
import EyeProducts from './EyeProducts';
import SimpleComponent from './SimpleComponent';
import Comments from '../Comments';
import ProductPrice from '../product/ProductPrice';



interface Props {
    eyeProductParam: EyeProductParams;
}

const EyeProductComponent: React.FC<Props> = ({ eyeProductParam }) => {

    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                {/* <Comments productId={804711}/> */}
                <ProductPrice searchParamsProductPrice={{ product_id: 471143}} />
                <EyeProducts eyeProductParam={eyeProductParam} />
                <Divider />
                <EyeProductAddComponent eyeProductParam={eyeProductParam} />
            </View>
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
