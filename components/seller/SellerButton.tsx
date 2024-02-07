
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet,Linking } from 'react-native';

import { Button, Card, ListItem, useTheme } from '@rneui/themed';
interface Props {
    sellerInfo: any;
}
const SellerButton: React.FC<Props> = ({ sellerInfo }) => {
    
    const handleLinkPress = (url) => {
        Linking.openURL(url);
    };

    return (
        <>
            <Button style={{flex: 1, alignItems: 'center'}} 
            onPress={() =>  handleLinkPress('https://www.digikala.com/seller/' + sellerInfo.sellerId)}>{sellerInfo.sellerTitle}</Button>
        </>

    );
};


export default SellerButton;