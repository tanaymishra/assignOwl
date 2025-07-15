'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useSocketStore } from './socketStore';
import { useAuth } from '../components/loginModal/functions';

export const SocketProvider: React.FC = () => {
  const { 
    setSocket, 
    setConnected, 
    setConnecting, 
    setError, 
    disconnect,
    socket,
    isConnected 
  } = useSocketStore();
  
  const { user } = useAuth();

  const initializeSocket = () => {
    // Don't initialize if already connected or connecting, or if user is not authenticated
    if (socket || !user) {
      return;
    }

    setConnecting(true);
    setError(null);

    try {
      // Create socket connection with user ID as auth
      const newSocket = io('http://localhost:5000', {
        auth: { token: user.id }, // Using user ID as token for now
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      // Connection successful
      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
        setSocket(newSocket);
        setConnected(true);
        setConnecting(false);
        setError(null);
      });

      // Connection error
      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setError(error.message || 'Failed to connect to server');
        setConnecting(false);
        setConnected(false);
      });

      // Disconnection
      newSocket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        setConnected(false);
        
        // Don't automatically reconnect on manual disconnect
        if (reason === 'io client disconnect') {
          setSocket(null);
        }
      });

      // Authentication error
      newSocket.on('auth_error', (error) => {
        console.error('Socket auth error:', error);
        setError('Authentication failed');
        setConnecting(false);
        setConnected(false);
        newSocket.disconnect();
      });

      // Reconnection attempt
      newSocket.on('reconnect_attempt', (attemptNumber) => {
        console.log(`Socket reconnection attempt: ${attemptNumber}`);
        setConnecting(true);
      });

      // Reconnection successful
      newSocket.on('reconnect', (attemptNumber) => {
        console.log(`Socket reconnected after ${attemptNumber} attempts`);
        setConnected(true);
        setConnecting(false);
        setError(null);
      });

      // Reconnection failed
      newSocket.on('reconnect_failed', () => {
        console.error('Socket reconnection failed');
        setError('Failed to reconnect to server');
        setConnecting(false);
        setConnected(false);
      });

    } catch (error) {
      console.error('Error creating socket:', error);
      setError('Failed to create socket connection');
      setConnecting(false);
    }
  };

  // Initialize socket when user is authenticated
  useEffect(() => {
    if (user && !socket && !isConnected) {
      console.log('User authenticated, initializing socket connection...');
      initializeSocket();
    } else if (!user && socket) {
      // Disconnect when user logs out
      console.log('User logged out, disconnecting socket...');
      disconnect();
    }
  }, [user, socket, isConnected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  // This component doesn't render anything
  return null;
};

export default SocketProvider;
