import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

// Custom hook for managing WebSocket connection
const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState(null);
  const [clientId] = useState(uuidv4()); // Generate a UUID for the session

  // Function to initialize the WebSocket connection
  const connectWebSocket = useCallback(() => {
    const socketIo = io();

    socketIo.on('connect', () => {
      console.log('WebSocket connected');
      // Send the clientId to the server after establishing the connection
      socketIo.emit('registerClient', { clientId });
    });

    socketIo.on('processedResults', (receivedData) => {
      console.log('Received processed results:', receivedData);
      setData(receivedData); // Update state with the received data
    });

    socketIo.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    setSocket(socketIo);
  }, [url, clientId]);

  // Effect to manage the WebSocket lifecycle
  useEffect(() => {
    connectWebSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [connectWebSocket, socket]);

  return data;
};

export default useWebSocket;
