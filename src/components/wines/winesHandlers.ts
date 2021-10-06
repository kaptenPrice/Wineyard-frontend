import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import useFetch from '../../lib/useFetch';

export const winesHandlers = () => {
    const fetchWines = async (
        currentPage: number,
        currentSize: number,
        setWineData: Dispatch<SetStateAction<any[]>>,
        setActualSize: Dispatch<SetStateAction<number>>,
        setCurrentPage: Dispatch<SetStateAction<number>>
    ) => {
        const nextPageIndex = currentPage + 1;
        try {
            const {
                data: { data, page, amountWines },
                status
            } = await useFetch('/wine/paginate', {
                method: 'POST',
                body: JSON.stringify({ size: currentSize, page: nextPageIndex })
            });
            if (status === 200) {
                setWineData((current) => [...current, ...data]);
                setActualSize(amountWines);
            }
            setCurrentPage(page);
        } catch (error) {
            console.error(error);
        }
    };
    return { fetchWines };
};
