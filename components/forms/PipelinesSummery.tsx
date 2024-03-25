
import React from 'react';

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import PipelinesTaskStatus from './PipelinesTaskStatus';



const PipelinesSummery = ({ data }) => {
    // Summarize the data based on lastStatus
    const summary = data.reduce((acc, pipeline) => {
        // Destructure lastStatus property for conciseness
        const { lastStatus } = pipeline;
      
        // Use default value of 0 if lastStatus doesn't exist in acc yet
        acc[lastStatus] = (acc[lastStatus] || 0) + 1;
        return acc;
      }, {});
      
     // debugger;
      console.log(summary); // { Active: 1, Pending: 1, Completed: 1 }
     
    return (
        <>
            {data && (
                <View style={styles.card}>
                    <Text style={styles.title}>Initial Text</Text>
                    {Object.entries(summary).map(([status, count]) => (
                        <Text key={status} style={styles.summaryText}>
                       
                            <PipelinesTaskStatus status={status} />     {`${count}`}
                        </Text>
                    ))}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 0,
    },
    buttonItem: {
        //width: '48%', // Adjust based on GRID_COLUMN_COUNT and desired proportions
        padding: 2,
        marginBottom: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    error: {
        fontSize: 20,
        fontWeight: "bold",
    },
    title: {
        fontSize: 16,

    },
    summaryText: {
        color: "red",

    },
});
export default PipelinesSummery;
