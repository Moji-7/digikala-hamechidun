import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';



import { useIncredibles } from './hooks/useIncredibles';
import ProductPrice from './product/ProductPrice';
const Incredibles = () => {
    const { theme } = useTheme();
    const { data, error, isLoading, isError } = useIncredibles("Params");

    const handleLinkPress = (url) => {
        // Open the URL in a browser when the link is pressed
        Linking.openURL(url);
    };

    return (
        <View style={styles.container}>
            {isLoading && <Text style={[styles.loading, { color: theme.colors.primary }]}>Loading...</Text>}
            {isError && <Text style={[styles.error, { color: theme.colors.error }]}>Error: {error.message}</Text>}
            {data && (
                <View style={styles.dataContainer}>
                    {data.map((item, index) => (
                        <>
                            <Card key={index} style={styles.card}>
                                <ListItem.Title>{item.title_fa}</ListItem.Title>
                                <Divider />
                                <ListItem.Subtitle>{item.brand}</ListItem.Subtitle>
                                <Divider />
                                <ProductPrice searchParamsProductPrice={{product_id:item.id}} />
                                <Button onPress={() => handleLinkPress('https://www.digikala.com/' + item.url)}>Open URL</Button>
                                {/* Add more UI components based on other columns */}
                                <Text>{item.category}</Text>
                                {/* Example of adding more UI components based on other columns */}
                           
                                <Card.Title title={item.title_en} />
                                <Card.Image source={{ uri: item.main_image_url }} />
                              
                                    <Text style={styles.price}>{item.selling_price} {item.discount_percent ? `(${item.discount_percent}% off)` : ''}</Text>
                                    <View style={styles.icons}>
                                        {item.is_fast_shipping ? <Text style={styles.icon}>🚀</Text> : null}
                                        {item.is_ship_by_seller ? <Text style={styles.icon}>🚚</Text> : null}
                                    </View>
                              
                                    <Button mode="contained" onPress={() => console.log(item.url)}>Buy Now</Button>
                                    <Button mode="outlined" onPress={() => console.log(item.seller_url)}>Visit Seller</Button>
                              
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
export default Incredibles