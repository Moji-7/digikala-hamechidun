// components/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { useHamechidunComments } from './hooks/useHamechidunComments';
import CommentsDatasetItem from './uicomponents/CommentsDatasetItem';
import CommentsMostLiked from './CommentsMostLiked';

interface Props {
    productId:number
}
const Comments: React.FC<Props> = ({ productId}) => {
    const { data, error, isLoading, isError } = useHamechidunComments(productId);
    return (
        <View>
            <Card>
                {data &&
                    <>
                        Saved Count:{data.count}
                        {/* {data.dataset.map((item) => (
                            <CommentsDatasetItem key={item.id} dataset={item} />
                        ))} */}
                         {data.dataset.map((item) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CommentsDatasetItem key={item.id} dataset={item} />
                            <CommentsMostLiked key={item.id} data={item.most_liked}/>
                            </View>

                            
                        ))}
                    </>
                }
            </Card>
        </View>
    );
};


export default Comments;