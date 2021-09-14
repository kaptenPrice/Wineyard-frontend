import React, { useEffect } from 'react';
import { getSocket } from '../global/provider/SocketProvider';

export const useSocket = (...props: useSocketPropsType) => {
    const socket = getSocket();

    useEffect(() => {
        socket.on(...props);
    }, []);
};

type useSocketPropsType = [ev: string, listener: (...args: any[]) => void];
