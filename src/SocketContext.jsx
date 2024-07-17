import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const socket = io('http://localhost:3001');

export const SocketProvider = ({ children }) => (
    <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
);
