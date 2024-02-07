

// Import the necessary modules
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button, Card, ListItem, useTheme } from '@rneui/themed';
import PriceDifferShow from '../uicomponents/PriceDiffer';
import { Divider } from '@rneui/base';


interface ProductPriceInfoProps {
    productPriceInfo: any;
    isIncredible: boolean
    increidiblePrice: number
}
const ProductPriceInfo: React.FC<ProductPriceInfoProps> = ({ productPriceInfo, isIncredible, increidiblePrice }) => {
    const { theme } = useTheme();
    const renderPriceInfo = () => {
        if (isIncredible) {
            return <Text>({productPriceInfo.discountPercent}%) OFF</Text>;
        } else {
            return <PriceDifferShow priceA={increidiblePrice} priceB={productPriceInfo.price} />;
        }
    };

    return (
        <>
            <Text style={[styles.dataTitle, { color: theme.colors.text }]}>
                <Text style={{ textDecorationLine: 'line-through' }}>{productPriceInfo.rrpPrice}</Text> | {productPriceInfo.price} |
                <Divider orientation="vertical" color="#ccc" width={2} style={{ marginVertical: 10 }} />
                {renderPriceInfo()}
            </Text>
            {/**/}

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
    dataSubtitle: {
        fontSize: 16,
        marginVertical: 5,
    },
});

// Export the component
export default ProductPriceInfo;