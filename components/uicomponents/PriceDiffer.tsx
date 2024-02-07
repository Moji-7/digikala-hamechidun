
// Import the necessary modules
import React, { useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Button, Card, ListItem, useTheme } from '@rneui/themed';


interface PriceDifferShowInfo {
  priceA: number;
  priceB: number;
}
const PriceDifferShow: React.FC<PriceDifferShowInfo> = ({ priceA, priceB }) => {

  const theme = useTheme();
  const calculatePercentageDifference = (a: number, b: number) => {
    return Math.round(((b - a) / a) * 100);
  };
  return (
    <>
      <Text style={[styles.centered, priceA - priceB > 0 ? styles.positive : priceA - priceB < 0 ? styles.negative : styles.zero]}>
        {priceA - priceB}({calculatePercentageDifference(priceA, priceB)})%
      </Text>
    </>

  );
};
const styles = StyleSheet.create({
  centered: { flex: 1, 
textAlign: 'center',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  zero: {
    color: 'black',
  },
});
export default PriceDifferShow;