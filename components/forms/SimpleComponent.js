import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useGetQuery,apiPipeline } from '../reduxApi/apiPipeline'; // Adjust import path
import { Button, Icon, useTheme } from '@rneui/themed';

import { PipelineIds } from '../entity/pipelines.dto';

const SimpleComponent = () => {

  const [pipelineId, setPipelineId] = useState(null);

   const { data, error, isError, isSuccess, isLoading, refetch } = useGetQuery(pipelineId)
  //const {
  //   data,
  //   error,
  //   isLoading,
  //   isError,
  //   isSuccess,
  //   refetch,
  // }  = apiPipeline.endpoints.getPipeline.useQuery(pipelineId);

  const handleClick = async (pipelineId) => {
    try {
      setPipelineId(pipelineId);
       //refetch();


    } catch (error) {
      console.error('Failed to fetch pipeline: ', error);
    }
  };

  return (
    <>
      {Object.entries(PipelineIds).map(([key, value]) => (
        <Button key={key} onPress={() => handleClick(value)}>
          {key}
        </Button>

      ))}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

      {isSuccess && salam}
      isLoading= {isLoading}
    </>
  );
};


export default SimpleComponent;