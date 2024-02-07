// components/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { useHamechidunComments } from './hooks/useHamechidunComments';



// Define types for the API response
type ApiResponse = [
    {
        id: number;
        product_id: number;
        data: {
            "Likes Grouped": {
                Sum: {
                    "Zero Likes": number;
                    "Non-Zero Likes": number;
                };
                Count: {
                    "Zero Likes": number;
                    "Non-Zero Likes": number;
                };
            };
            average_rating: string;
            "Max Likes in the Dataset": string;
            "Total Number of Likes in the Dataset": string;
        };
        created_at: string;
    },
    number
];
const Comments: React.FC<{ apiData: ApiResponse }> = ({ apiData }) => {
//const { data, error, isLoading, isError } = useHamechidunComments("Params");
    const [result, extra] = apiData;

    return (
        <View>
            <Card>
                {data.map((item, index) => (
                    <>
                        <Text>ID: {item.id}</Text>
                        {/* <Text>Product ID: {result.product_id}</Text>
                        <Text>Created At: {result.created_at}</Text>
                        <View>
                            <Text>Likes Grouped:</Text>
                            <ListItem>
                                <Text>Sum:</Text>
                                <Text>Zero Likes: {result.data["Likes Grouped"].Sum["Zero Likes"]}</Text>
                                <Text>Non-Zero Likes: {result.data["Likes Grouped"].Sum["Non-Zero Likes"]}</Text>
                            </ListItem>
                            <ListItem>
                                <Text>Count:</Text>
                                <Text>Zero Likes: {result.data["Likes Grouped"].Count["Zero Likes"]}</Text>
                                <Text>Non-Zero Likes: {result.data["Likes Grouped"].Count["Non-Zero Likes"]}</Text>
                            </ListItem>
                            <Text>Average Rating: {result.data.average_rating}</Text>
                            <Text>Max Likes in the Dataset: {result.data["Max Likes in the Dataset"]}</Text>
                            <Text>Total Number of Likes in the Dataset: {result.data["Total Number of Likes in the Dataset"]}</Text>
                        </View> */}
                    </>
                ))}
            </Card>
            <View>
                <Text>Extra Information: {extra}</Text>
            </View>
        </View>
    );
};



export default Comments;