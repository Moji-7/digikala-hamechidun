import React, { createContext, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';



import ProductPrice from './product/ProductPrice';
import { useIncrediblesWithOtherSellers } from './hooks/useIncrediblesOtherSellers';
import ProductSellersInfo from './product/ProductOtherInfo';
import ProductPriceInfo from './product/ProductPriceInfo';
import SellerButton from './seller/SellerButton';
import HamechdunNavigator from './HamechdunNavigator';

export const HamechidunContext = createContext<any>(null);

const IncrediblesWithOtherSellers = () => {
    const { theme } = useTheme();
    const { data, error, isLoading, isError } = useIncrediblesWithOtherSellers("Params");

    const handleLinkPress = (url) => {
        // Open the URL in a browser when the link is pressed
        Linking.openURL(url);
    };
    // Create a context for the item prop



    return (
        <View style={styles.container}>
            {isLoading && <Text style={[styles.loading, { color: theme.colors.primary }]}>Loading...</Text>}
            {isError && <Text style={[styles.error, { color: theme.colors.error }]}>Error: {error.message}</Text>}
            {data && (
                <View style={styles.dataContainer}>
                    {data.map((item, index) => (
                        <>
                            <Card key={index} style={styles.card}>
                                {/* <ListItem.Title>{item.incredible.incredible_id}</ListItem.Title> */}
                                <Card.Title>
                                    {item.incredible.title_fa}
                                </Card.Title>
                                <SellerButton sellerInfo={{ sellerId: item.incredible.inc_sellerId, sellerTitle: item.incredible.inc_sellerTitle }} />
                                <ProductPriceInfo
                                    productPriceInfo={{ rrpPrice: item.incredible.inc_rrpPrice, price: item.incredible.inc_price, discountPercent: item.incredible.inc_discountPercent }}
                                    isIncredible={true}
                                    increidiblePrice={0} />
                                <ListItem.Title>
                                    min price in  1month:
                                    {item.incredible.inc_minPriceInLastMonth}
                                </ListItem.Title>
                                <Card.Divider />
                                {/* <ProductSellersInfo sellers={item.otherSellers} increidiblePrice={item.incredible.inc_price} /> */}
                                <HamechidunContext.Provider value={{productId:item.incredible.product_id}}>
                                    <HamechdunNavigator key={index} />
                                </HamechidunContext.Provider>
                            </Card>
                        </>
                    ))}

                </View>
            )}

        </View>
    )
}


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
export default IncrediblesWithOtherSellers