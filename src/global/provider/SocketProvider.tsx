import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

export const SocketContext = createContext(null);

const SocketProvider = ({ children }: PropsWithChildren<any>) => {
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);

    useEffect(() => {
        const socket = io('http://localhost:3001');
        setSocket(socket);

        socket.on('connect', () => {
            console.log('socketIo is connected');
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnecting');
        });
    }, []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketProvider;

export const getSocket = (): UseSocketType => useContext(SocketContext);

type UseSocketType = Socket<DefaultEventsMap, DefaultEventsMap>;
