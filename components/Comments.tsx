import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Avatar, useTheme, Icon, Divider } from '@rneui/themed'; // Assuming useScrapedData is a custom hook
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useScrapedData } from './hooks/useScrapedData';

interface Comment {
  id: number;
  title: string;
  body: string;
  created_at: string;
  rate: number;
  likes: number;
  dislikes: number;
  // Add other properties as needed
}

interface CommentsResponse {
  comments: Comment[];
  count: number;
}

interface Props {
    productId?: number;
    route?: {
      params?: {
        productId?: number;
      };
    };
  }
  

const Comments: React.FC<Props> = ({ productId ,route}) => {
    const finalProductId = productId || route?.params?.productId;

    const { theme } = useTheme();

  const { data, error, isLoading, isError } = useScrapedData(finalProductId);

  return (
    <View>
      <Card>
        {data && (
          <>
            <Text style={styles.countText}>Total Comments: {data.count}</Text>
            {data.comments.map((comment: Comment) => (
              <View style={styles.commentContainer} key={comment.id}>
                <View style={styles.headerContainer}>
                  {/* Replace Avatar.Text with Avatar and use the title prop */}
                  <Avatar title={comment.title} size={40} />
                  <View style={styles.titleContainer}>
                       <Text style={styles.commentBody}>{comment.body}</Text>
                    <Text style={styles.commentDate}>{comment.created_at}</Text>
                  </View>
                  <Icon name="star" type="font-awesome" size={24} color="gold" />
                  <Text style={styles.ratingText}>{comment.rate}</Text>
                </View>
             
                <View style={styles.footerContainer}>
                  <Icon name="thumb-up" size={20} color="green" />
                  <Text style={styles.likesText}>{comment.likes}</Text>
                  <Icon name="thumb-down" size={20} color="red" />
                  <Text style={styles.dislikesText}>{comment.dislikes}</Text>
                </View>
                <Divider />
              </View>
            ))}
          </>
        )}
      </Card>
    </View>
  );
};


const styles = StyleSheet.create({
  countText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  titleContainer: {
    marginLeft: 10,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentDate: {
    color: 'gray',
  },
  ratingText: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  commentBody: {
    marginBottom: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likesText: {
    marginLeft: 5,
    marginRight: 20,
  },
  dislikesText: {
    marginLeft: 5,
  },
});

export default Comments;
