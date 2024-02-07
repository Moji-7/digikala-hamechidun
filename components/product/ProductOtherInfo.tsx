// Import the necessary modules
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button, Card, ListItem, useTheme } from '@rneui/themed';
import ProductPriceInfo from './ProductPriceInfo';
import SellerButton from '../seller/SellerButton';


interface Props {
    sellers: any[];
    increidiblePrice: number
}
const ProductSellersInfo: React.FC<Props> = ({ sellers, increidiblePrice }) => {
    const { theme } = useTheme();
    return (
        <>
            {
                sellers && (
                    <>
                        <Card.Title style={{ color: theme.colors.text }}> others sellers 🐾</Card.Title>
                        {sellers.map((item, index) => (
                            <Card key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <SellerButton sellerInfo={{ sellerId: item.sellerId, sellerTitle: item.sellerTitle }} />
                                <ProductPriceInfo productPriceInfo={item} isIncredible={false} increidiblePrice={increidiblePrice} />
                            </Card>
                        ))}
                    </>
                )}
        </>
    );
};
// Define the styles for the component using StyleSheet
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
    dataSubtitle: {
        fontSize: 16,
        marginVertical: 5,
    },
});

// Export the component
export default ProductSellersInfo;