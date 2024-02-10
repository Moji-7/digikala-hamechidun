import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import {CommentDataset}  from '../entity/commentsDto.js'

interface Props{
  dataset:CommentDataset
}
  const CommentsDatasetItem: React.FC<Props> = ({ dataset}) => {
 // Format the date


    return (
      
      <Card>
        {/* <ListItem>
          <Text>ID: {dataset.id}</Text>
        </ListItem>
        <Divider />
        <ListItem>
          <Text>Product ID: {dataset.product_id}</Text>
        </ListItem>
        <Divider /> */}
         <ListItem>
          <Text>Created At: {new Date(dataset.created_at).toDateString()}</Text>
        </ListItem>
        <ListItem>
          <Text>Rate Average: {dataset.data.rate_avg}</Text>
        </ListItem>
        <Divider />
        <ListItem>
          <Text>Likes Count: {dataset.data.likes_count}</Text>
        </ListItem>
        <Divider />
        <ListItem>
          <Text>Likes Max: {dataset.data.likes_max}</Text>
        </ListItem>
        <Divider />
        <ListItem>
          <Text>Likes Grouped:</Text>
          <View style={{ marginLeft: 10 }}>
            <Text>Sum - Likes Zero: {dataset.data.likes_grouped.sum.likes_zero}</Text>
            <Text>Sum - Likes NonZero: {dataset.data.likes_grouped.sum.likes_nonZero}</Text>
            <Text>Count - Likes Zero: {dataset.data.likes_grouped.count.likes_zero}</Text>
            <Text>Count - Likes NonZero: {dataset.data.likes_grouped.count.likes_nonZero}</Text>
          </View>
        </ListItem>
        <Divider />
       
      </Card>
    );
  };
  

export default CommentsDatasetItem;