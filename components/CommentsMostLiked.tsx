// components/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';

import { useHamechidunComments } from './hooks/useHamechidunComments';
import CommentsDatasetItem from './uicomponents/CommentsDatasetItem';

interface Props {
    // productId:number,
    // commentId:number
    data:any
}

const CommentsMostLiked:React.FC<Props> = ({ data }) => { //commentId,productId
  const theme = useTheme();

  return (
    <View>
      <Card style={styles.card}>
        <ListItem>
          <Text style={styles.text}>{data.title}</Text>
          <Divider />
          <Text style={styles.text}>{data.body}</Text>
        </ListItem>
        {/* <Button style={styles.button} onPress={() => Linking.openURL('https://example.com')}>
          Read More
        </Button> */}
      </Card>
      <Divider />
      <Card style={styles.card}>
        <ListItem>
          <Text style={styles.text}>Rate: {data.rate}</Text>
          <Text style={styles.text}>Likes: {data.likes}</Text>
          <Text style={styles.text}>Dislikes: {data.dislikes}</Text>
        </ListItem>
        <ListItem>
          <Text style={styles.text}>Advantages: {data.advantages}</Text>
          <Text style={styles.text}>Disadvantages: {data.disadvantages}</Text>
        </ListItem>
      </Card>
      <Divider />

      <Card style={styles.card}>
        <ListItem>
          <Text style={styles.text}>Recommendation Status: {data.recommendation_status}</Text>
        </ListItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    
  },
  button: {

    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    elevation: 4,
  },
});

export default CommentsMostLiked;