import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';

import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';



import ProductPrice from './product/ProductPrice';
import { useIncrediblesWithProducts } from './hooks/useIncrediblesWithProducts';
const IncrediblesWithProducts = () => {
    const { theme } = useTheme();
    const { data, error, isLoading, isError } = useIncrediblesWithProducts("Params");

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
                                <ListItem.Title>{item.Incredible.inc_id}</ListItem.Title>

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
export default IncrediblesWithProducts