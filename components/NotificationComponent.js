import React, { useState, useEffect } from 'react';
import { View, Modal, Button, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux'; // Import useDispatch
import useSocket from './hooks/useCustomSocket';
import { addNotification } from './reduxApi/notificationsSlice.reducer';
import NotificationListComponent from './NotificationListComponent';

const NotificationComponent = () => {
    const dispatch = useDispatch(); // Get the dispatch function
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const socket = useSocket('http://localhost:3222');

    useEffect(() => {
        if (socket) {
            // socket.on('published_from_SocketToClient_pipelineStatus', (data) => {
            //     setCount(prevCount => prevCount + 1);
            //     setMessage(data);
            // });
            socket.on('published_from_SocketToClient_pipelineStatus', (data) => {
                console.log(data)
                setCount(prevCount => prevCount + 1);
                // Check if data is a string and parse it to an object
                const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
                setMessage(parsedData);
                dispatch(addNotification(parsedData)); // Dispatch the action here
            });


            socket.on('pong', (data) => {
                console.log('Pong received:', data);
            });
        }
    }, [socket]);

    const handlePress = () => {
        //alert(`Message: ${message}`);
        setModalVisible(true);
        setCount(0); // reset count after showing the message
    };

    const handleClose = () => {
        setModalVisible(false);
    };

    return (
        <View>

            <TouchableOpacity onPress={handlePress}>
                <View style={{ position: 'relative' }}>
                    <Text>🔔</Text> {/* replace with your icon */}
                    {count > 0 && (
                        <View style={{
                            position: 'absolute',
                            right: +10,
                            top: -10,
                            backgroundColor: 'red',
                            borderRadius: 10,
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Text style={{ color: 'white' }}>{count}</Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleClose}  >
                <View style={{ marginTop: 22 }}>
                    <View>
                        <NotificationListComponent />
                        <Button onPress={handleClose} title="Close" />
                    </View>
                </View>
            </Modal>
        </View>
    );

};

export default NotificationComponent;
