// PipelineButton.js

import React from 'react';
import { View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';
import { PipelineDetail } from '../entity/pipelines.dto';


interface PipelinesButtonProps {
  pipelineStatusSummery: any;
  handleRunPipeLineStatusProccess: (e: any, pipelineStatus: any) => void;
  loadingStates: number[];
  getButtonColor: (pipelineStatusSummery: any) => string;
}

const PipelinesButton: React.FC<PipelinesButtonProps> = ({
  pipelineStatusSummery,
  handleRunPipeLineStatusProccess,
  loadingStates,
  getButtonColor,
}) => {
  const { theme } = useTheme();

  // Assuming you have defined 'integer' somewhere
  const integer = pipelineStatusSummery.pipelineId; // Replace with your actual value

  return (
    <View style={styles.buttonItem}>
      <Button
        title={`Run Pid ${pipelineStatusSummery.pipelineId}`}
        onPress={(e) => handleRunPipeLineStatusProccess(e, pipelineStatusSummery)}
        disabled={loadingStates.includes(pipelineStatusSummery.id) || pipelineStatusSummery.lastRunnedStatus == 'Success'}
        color={getButtonColor(pipelineStatusSummery)}
      />
      ({pipelineStatusSummery.lastRunnedStatus})
      {loadingStates.includes(integer) && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};



export default PipelinesButton;

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
});