

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Linking, FlatList, GestureResponderEvent, ScrollView } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button, Tab } from '@rneui/themed';
import { PipelineIds } from '../entity/pipelines.dto';

interface Props {
    pipeLineIds: PipelineIds;
}

const RunPipelineButton: React.FC<Props> = ({ pipeLineIds }) => {

    const { theme } = useTheme();
    const handlePipeline = async (e,pipeLineIds:PipelineIds) => {
   
     }
   
    return (
        <>
          <Button onPress={(e) => handlePipeline(e,pipeLineIds)} title='remove' />
        </>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default RunPipelineButton;