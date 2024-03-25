import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, FlatList, Animated } from 'react-native';
import { Card, ListItem, Divider, useTheme, Button } from '@rneui/themed';
import { useEyeProduct } from '../hooks/useEyeOnProduct';
import { EyeProduct, EyeProductParams } from '../entity/Eye.dto';


import { Alert } from 'react-native';
import AlertComponenti from '../uicomponents/AlertComponent';
import EyeProductAddComponent from './EyeProductAdd';

import { useDispatch, useSelector } from 'react-redux';


import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import useSocket from '../hooks/useCustomSocket';
import { convertDateToShamsi } from '../../utils/dateUtils';

import { useGetEyeQuery, useDeleteItemMutation } from '../reduxApi/api';


import PipelinesStatusSummeryComponent from './PipelinesStatusSummeryComponent';

// import { useSocket, useSocketEvent } from 'socket.io-react-hook';



interface Props {
    eyeProductParam: EyeProductParams;
}

const EyeProducts: React.FC<Props> = ({ eyeProductParam }) => {
    const { theme } = useTheme();


    // const { socket,connected, error: socketError } = useSocket();
    //const { lastMessage, sendMessage } = useSocketEvent(socket, 'message');
    const { data: data1, error: error1 } = useGetEyeQuery();
    const eyeProducts = useSelector((state) => state.eye.eyeProducts);
    

    //1- const { data, error,refetch } = useGetEyeQuery();
    //2- const {  eyeProducts } = useGetEyeQuery(undefined, {
    //     selectFromResult: ({ data }) => ({ eyeProducts: data })
    // });


    // Event handler for sending a message

    // Event listener for receiving messages
    // socket.on('pong', (data) => {
    //     console.log('Received:', data);
    // });
    const [deleteItem, { isLoading, isError }] = useDeleteItemMutation();

    const handleDelete = async (event, productId: number) => {
        event.preventDefault()
        try {
            await deleteItem(productId);
            //refetch()
            //const handleSendMessage = (message) => {
            //sendMessage('results.processed', 'message'); 

            // socket.emit('ping', 'Hello from React!');
            // Replace 'event-name' with your event
            // };
        } catch (err) {
            console.error('Delete failed', error);
        }

    };


    // const socket = useSocket('http://localhost:3222');
    // useEffect(() => {
    //     if (socket) {

    //         socket.on('published_from_SocketToClient_pipelineStatus', (data) => {
    //             console.log('notify_clinet_for_processed:', data);
    //             // Handle the updated data as needed
    //         });

    //         socket.on('pong', (data) => {
    //             console.log('Pong received:', data);
    //         });

    //     }
    // }, [socket]);


    // const pingPong = () => {
    //     socket.emit('ping', 'Hello world!');
    // }

    return (
        <Card style={styles.container}>
            {eyeProducts && ( // Render when products exist
                <View style={styles.gridContainer}>
                    <Text>🤑🐾 My Eys: 🤑🐾</Text>
                    {eyeProducts.map((eyeProduct, index) => (
                        <ListItem key={eyeProduct.id} style={styles.gridRow}>
                            <ListItem.Content>
                                <ListItem.Title>{eyeProduct.titleFa}</ListItem.Title>
                                <ListItem.Title>{convertDateToShamsi(eyeProduct.created_at)}</ListItem.Title>
                                <ListItem.Subtitle style={styles.gridItem}>
                                    <Button onPress={(e) => handleDelete(e, eyeProduct.id)} title='remove' color={theme.myColors.danger} />
                                    <Divider style={{ width: '100%' }} />
                                    <PipelinesStatusSummeryComponent eyeProductId={eyeProduct.id}  />        
                                </ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))}
                </View>
            )}
        </Card>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 6,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    gridItem: {
        //width: '48%', // Adjust based on GRID_COLUMN_COUNT and desired proportions
        padding: 8,
        marginRight: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    gridItemTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 4,
    },
    gridItemInfo: {
        fontSize: 16,
        marginBottom: 8,
    },
    gridItemCreatedAt: {
        fontSize: 14,
        color: '#888',
    },
    loading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    error: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default EyeProducts;