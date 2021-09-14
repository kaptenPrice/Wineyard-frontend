import React, { useEffect, useRef, useState } from 'react';
import useFetch from '../lib/useFetch';
import { Grid } from '@material-ui/core';
import wineImg from '../global/images/wine-image.jpg';
import { WineCard } from './WineCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSocket } from '../lib/useSocket';
export const Wines = () => {
    const [wineData, setWineData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(10);
    const [actualSize, setActualSize] = useState(0);
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);

    useEffect(() => {
        fetchWines();
    }, []);

    const fetchWines = async () => {
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

    useSocket('wine-liked', (newLikedWineData) => {
        setWineData((current) =>
            current.map((currentWine) => (currentWine._id === newLikedWineData._id ? newLikedWineData : currentWine))
        );
    });
    const handleExpandItem = (id: string) => {
        setExpandedItemId((prev) => (prev !== id ? id : null));
    };
    const getWines = () => {
        return wineData.map(({ _id, updatedAt, ...props }) => (
            <WineCard
                key={_id}
                image={wineImg}
                date={updatedAt}
                expanded={expandedItemId === _id}
                handleExpandOnClick={() => handleExpandItem(_id)}
                _id={_id}
                {...props}
            />
        ));
    };
    return (
        <InfiniteScroll
            next={fetchWines}
            hasMore={wineData.length < actualSize}
            loader={
                <Grid container justifyContent='center' item xs={12}>
                    <CircularProgress />
                </Grid>
            }
            dataLength={wineData.length}
        >
            {getWines()}
        </InfiniteScroll>
    );
};
