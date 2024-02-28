import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button, ActivityIndicator } from 'react-native'; // Import the necessary components

import { useSubmitMutation } from '../reduxApi/apiPipeline';
import { useTheme } from '@rneui/themed';

interface Props {
  integers: number[];
}

const PipelinesComponent: React.FC<Props> = ({ integers }) => {
    const { theme } = useTheme();

  const [submitApi, {  error, isSuccess, data }] = useSubmitMutation();
  const [loadingStates, setLoadingStates] = useState<number[]>([]); // State to track loading for each button

  const handleCallPipeLine = async (event, pipelineId: number) => {
    event.preventDefault();

    try {
      // Set loading state for the specific button being clicked
      setLoadingStates((prevLoadingStates) => [...prevLoadingStates, pipelineId]);
      await submitApi({ id: pipelineId }).unwrap();
      // refetch();
    } catch (err) {
      console.error('Delete failed', error);
    } finally {
      // Remove loading state for the specific button
      setLoadingStates((prevLoadingStates) =>
        prevLoadingStates.filter((id) => id !== pipelineId)
      );
    }
  };




  const getButtonColor = (pipelineId: number) => {
    if (isSuccess && data?.id === pipelineId || ) { // Use data?.id for success state
      return 'green';  // Green for successful pipeline
    } else if (loadingStates.includes(pipelineId)) {
      return '#ddd'; // Grey for loading state
    }
   // return 'red'; // Default color for other states
  };
  return (
    <View style={styles.container}>
      {integers.map((integer) => (
        <View key={integer} style={styles.buttonItem}>
          <Button      
            onPress={(e) => handleCallPipeLine(e, integer)}
            disabled={loadingStates.includes(integer)} // Disable the button if loading for this button
            title={`Run Pid ${integer}`}
            color={getButtonColor(integer)}
          />
          {loadingStates.includes(integer) && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      ))}
      {/* {isError && <Text color="red">{error}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({

  buttonItem: {
    //width: '48%', // Adjust based on GRID_COLUMN_COUNT and desired proportions
    padding: 2,
    marginBottom: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
},
});

export default PipelinesComponent;
