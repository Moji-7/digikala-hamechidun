import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, ActivityIndicator } from 'react-native'; // Import the necessary components

import { apiPipeline, useGetAllQuery, useGetPipelineStatusSummeryQuery, useSubmitMutation, useSubmitProccessMutation } from '../reduxApi/pipelineApi';
import { useTheme } from '@rneui/themed';
import PipelinesButton from './PipelinesButton';
import PipelinesSummery from './PipelinesSummery';
import { useDispatch, useSelector } from 'react-redux';
import useSocket from '../hooks/useCustomSocket';

//import useWebSocket from '../hooks/useWebSocket';



interface Props {
    eyeProductId: number;
}

const PipelinesStatusSummeryComponent: React.FC<Props> = ({ eyeProductId }) => {
    const { theme } = useTheme();
    const dispatch = useDispatch();

    //const { data: data2, error: error2 } = useGetPipelineStatusSummeryQuery(eyeProductId);
    const pipelineStatusSummery = useSelector((state) => state.pipeline.pipelineStatusSummery[eyeProductId]);



    const toggleExpansion = () => {
        setExpanded(!expanded);
        if (!expanded) {
            // Trigger the API call only when expanding the component
            dispatch(apiPipeline.endpoints.getPipelineStatusSummery.initiate(eyeProductId))
                .unwrap()
                .catch((err) => setError(err));
        }
    };

    // const processedData = useWebSocket('http://localhost:3222');
    //get

    // const { data } = useGetAllQuery();
    // const pipelinesDetails = useSelector((state) => state.pipeline.details);
    //get
    const initialText = 'Summery';
    const expandedText = 'Details'
    const [expanded, setExpanded] = useState(false);
    const [error, setError] = useState(null);

    const [submitApi, isSuccess, isError] = useSubmitMutation();
    const [loadingStates, setLoadingStates] = useState<number[]>([]);
    const [submitProccessApi, { isLoading: submitProccessIsLoading, isSuccess: submitProccessIsSuccess, isError: submitProccessIsError }] = useSubmitProccessMutation();

    const handleRunPipeLineStatusProccess = async (event: any, pipeLineStatus: any) => {
        event.preventDefault();
        try {
            // Set loading state for the specific button being clicked
            setLoadingStates((prevLoadingStates) => [...prevLoadingStates, pipeLineStatus.pipelineId]);
            await submitProccessApi(pipeLineStatus).unwrap();
            // refetch();
        } catch (err) {
            console.error('Delete failed', error);
        } finally {
            // Remove loading state for the specific button
            setLoadingStates((prevLoadingStates) =>
                prevLoadingStates.filter((id) => id !== pipeLineStatus.pipelineId)
            );
        }
    };



    // const getButtonColor = (pipelineStatusSummery: any) => {
    //     debugger;
    //       if (submitProccessIsSuccess && pipelineStatusSummery?.id === pipelineStatusSummeryId) { // Use data?.id for success state
    //     return 'green';}  // Green for successful pipeline
    //     // } else if (loadingStates.includes(pipelineId)) {
    //     //     return '#ddd'; // Grey for loading state
    //     //   }
    //   return 'red'; // Default color for other states
    // };
    const getButtonColor = (pipelineStatusSummery: any) => {
        switch (pipelineStatusSummery.lastRunnedStatus) {
          case 'Active':
            return 'green';
          case 'Disabled':
            return 'gray';
          case 'Pending':
            return 'yellow';
          default:
            return 'white'; // Default color if status doesn't match
        }
      };



    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>
                {expanded ? expandedText : initialText}
            </Text>

            <TouchableOpacity onPress={toggleExpansion}>
                <Text style={styles.textStyle}>
                    {expanded ? 'Read less' : 'Read more'}
                </Text>
            </TouchableOpacity>
            {expanded && error && <Text style={{ color: 'red' }}>{error.message}</Text>}

            {expanded && pipelineStatusSummery ? (

                pipelineStatusSummery.map((pipelineStatusSummery: any) => (
                    <PipelinesButton key={pipelineStatusSummery.id}
                    pipelineStatusSummery={pipelineStatusSummery}
                        handleRunPipeLineStatusProccess={(e) => handleRunPipeLineStatusProccess(e, pipelineStatusSummery)}
                        loadingStates={loadingStates}
                        getButtonColor={getButtonColor}
                    />
                ))

            ) : expanded ? (
                <Text>Loading...</Text> // Show loading text only when expanded
            ) : null}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
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
    textStyle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    toggleButton: {
        color: "red",

    },
});

export default PipelinesStatusSummeryComponent;


