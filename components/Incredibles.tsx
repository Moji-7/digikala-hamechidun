import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';



import ProductPrice from './product/ProductPrice';
import SellerButton from './seller/SellerButton';
import ProductPriceInfo from './product/ProductPriceInfo';
import { useIncrediblesWithOtherSellers } from './hooks/useIncrediblesOtherSellers';
import { useDispatch, useSelector } from 'react-redux';
import { apiIncredibles, useGetAllQuery } from './reduxApi/incrediblesApi';
const Incredibles = () => {
    const { theme } = useTheme();
    const {  error, isLoading } = useGetAllQuery();

    const incredibles = useSelector((state) => state.incredibles.incredibles);
    const dispatch = useDispatch();

 
    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    const handleButtonClick = (newParam) => {
        dispatch(apiIncredibles.endpoints.getAll.initiate(newParam));
    };


    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                <Button onPress={(e) => handleButtonClick("scrap==> not scrap yet")} title='scrap==> not scrap yet' color={theme.myColors.danger} />
                <Button onPress={(e) => handleButtonClick("mysql==> scrap already")} title='mysql==> scrap already' color={theme.myColors.danger} />
                {isLoading && <Text style={[styles.loading, { color: theme.colors.primary }]}>Loading...</Text>}
                {/* {isError && <Text style={[styles.error, { color: theme.colors.error }]}>Error: {error.message}</Text>} */}
                {incredibles && (
                    <View style={styles.dataContainer}>
                        {incredibles.map((item, index) => (
                            <>
                                <Card key={index} style={styles.card}>

                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={styles.imageContainer}>
                                            <ListItem.Title>{item.title_fa} ({item.brand})</ListItem.Title>
                                            <Text>
                                                {/* <ProductPriceInfo productPriceInfo={{ price: item.selling_price, rrpPrice: item.rrp_price, discountPercent: item.discount_percent }} /> */}

                                            </Text>
                                            {/* <Card.Image
                                            source={{ uri: item.main_image_url }}
                                            style={{ width: '100%', aspectRatio: 1, resizeMode: 'contain' }}
                                        /> */}
                                            <Text>{item.category}</Text>
                                        </View>

                                    </View>


                                    <Divider />
                                    {/* <ProductPrice searchParamsProductPrice={{ product_id: item.id }} /> */}
                                    {/* Add more UI components based on other columns */}

                                    <SellerButton sellerInfo={{ sellerId: item.seller_id, sellerTitle: item.seller_title }} />


                                    <Button mode="contained" onPress={() => console.log(item.url)}>Buy Now</Button>

                                </Card>
                            </>
                        ))}

                    </View>
                )}

            </View>
        </View>
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
    imageContainer: {
        flex: 1, // Take up the remaining space in the row
        alignItems: 'flex-end', // Align the image to the right
        padding: 10, // Add some space around the image
        borderWidth: 2, // Add a border
        borderColor: '#757083', // Choose a border color
        borderRadius: 10, // Make the border rounded
    },
});
export default Incredibles