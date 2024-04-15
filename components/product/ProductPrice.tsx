// Import the necessary modules
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet ,Linking} from 'react-native';

import ListCategoryGrouped from '../uicomponents/ListCategoryGrouped';
import { useProductPrice } from '../hooks/product/useProductPrice';
import { Card, useTheme ,Button} from '@rneui/themed';
import OrderItemOne from '../uicomponents/OrderItemOne';
import { SearchParamsOrderItem, SearchParamsProductPrice } from '../entity/SearchQueries';
import PriceDifferShow from '../uicomponents/PriceDiffer';

interface SearchParamsProductPriceProps {
    searchParamsProductPrice: SearchParamsProductPrice;
    route?: {
        params?: {
            searchParamsProductPrice?: SearchParamsProductPrice;
        };
      };
}
const ProductPrice: React.FC<SearchParamsProductPriceProps> = ({ searchParamsProductPrice, route}) => {
    // Use the useTheme hook to get the theme object
    const { theme } = useTheme();
    const params = (searchParamsProductPrice|| route?.params?.searchParamsProductPrice)  as SearchParamsProductPrice;;
    const { data, error, isLoading, isError } = useProductPrice(params);
    // Extract the minimum selling price record for the incredible price
    const increidiblePrice = data?.minPriceRecord?.selling_price;
    return (

        <View style={styles.container}>
            {isLoading && (
                <Text style={[styles.loading, { color: theme.colors.primary }]}>
                    Loading...
                </Text>
            )}
            {isError && (
                <Text style={[styles.error, { color: theme.colors.error }]}>
                    Error: {error.message}
                </Text>
            )}

            {

                data && (
                    <Card>
                        <Card.Title style={{ color: theme.colors.text }}>Order Item (details) 🛒🐾</Card.Title>
                        <Card.Divider />
                        {data.allRecords.map((productInfo, index) => (
                            <Card key={productInfo.id}>
                                {productInfo.selling_price}
                                <PriceDifferShow priceA={increidiblePrice} priceB={productInfo.selling_price} />
                                <Button title={productInfo.seller_title} onPress={() => Linking.openURL(productInfo.seller_url)} />
                            </Card>
                        ))}
                    </Card>
                )}

        </View>
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
export default ProductPrice;