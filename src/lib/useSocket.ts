import React, { useEffect, useState } from 'react';
import { getSocket } from '../provider/SocketProvider';

export const useSocket = (...props: useSocketPropsType) => {
    const [isActive, setIsActive] = useState(false);
    const socket = getSocket();

    useEffect(() => {
        if (socket && !isActive) {
            let [events, ...rest] = props;

            if (typeof events === 'string') {
                events = [events];
            }
            events.forEach((event) => {
                socket.on(event, ...rest);
            });

            setIsActive(true);
        }
    }, [socket]);
};

type useSocketPropsType = [ev: string | string[], listener: (...args: any[]) => void];
