// components/SettingsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { useHamechidunComments } from './hooks/useHamechidunComments';
import CommentsDatasetItem from './uicomponents/CommentsDatasetItem';


const Commentss: React.FC<{}> = ({ }) => {
    const { data, error, isLoading, isError } = useHamechidunComments("Params");
    return (
        <View>
            <Card>
                {data &&
                    <>
                        Saved Count:{data.count}
                        {data.dataset.map((item) => (
                            <CommentsDatasetItem key={item.id} dataset={item} />
                        ))}
                    </>
                }

            </Card>
            <View>

            </View>
        </View>
    );
};



export default Commentss;