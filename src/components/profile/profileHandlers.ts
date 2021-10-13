import React, { Dispatch } from 'react';
import useFetch from '../../lib/useFetch';

export const profileHandlers = () => {

    const fetchWinesAddedByCurrentId = async (setWinesAddedByCurrent: Dispatch<React.SetStateAction<any[]>>) => {
        try {
            const response = await useFetch('/wine/getaddedby');
            setWinesAddedByCurrent(response.data);
        } catch (error) {
            console.log('error: ', error);
        }
    };
    return {
        fetchWinesAddedByCurrentId
    };
};
