'use client';

import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  setSocket: (socket: Socket | null) => void;
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setError: (error: string | null) => void;
  disconnect: () => void;
  reset: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  
  setSocket: (socket) => set({ socket }),
  
  setConnected: (connected) => set({ isConnected: connected }),
  
  setConnecting: (connecting) => set({ isConnecting: connecting }),
  
  setError: (error) => set({ error }),
  
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ 
        socket: null, 
        isConnected: false, 
        isConnecting: false,
        error: null 
      });
    }
  },
  
  reset: () => set({ 
    socket: null, 
    isConnected: false, 
    isConnecting: false,
    error: null 
  }),
}));

// Selector hooks for better performance
export const useSocket = () => useSocketStore((state) => state.socket);
export const useIsConnected = () => useSocketStore((state) => state.isConnected);
export const useIsConnecting = () => useSocketStore((state) => state.isConnecting);
export const useSocketError = () => useSocketStore((state) => state.error);
