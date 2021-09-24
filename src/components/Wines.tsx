import React, { useEffect, useState } from 'react';
import useFetch from '../lib/useFetch';
import { Grid } from '@material-ui/core';
import wineImg from '../global/images/wine-image.jpg';
import { WineCard } from './WineCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSocket } from '../lib/useSocket';
import { stringToInitials } from '../lib/utils';

export const Wines = () => {
    const [wineData, setWineData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(10);
    const [actualSize, setActualSize] = useState(0);
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);
    const showActionButtons: boolean = true;

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

    useSocket(['wine-liked', 'wine-unliked'], (newWineData) => {
        setWineData((current) =>
            current.map((currentWine) => (currentWine._id === newWineData._id ? newWineData : currentWine))
        );
    });

    useSocket('wine-added', (newData) => {
        !wineData.includes(newData._id) && setWineData((current) => [...current, newData]);
    });
    const handleExpandItem = (id: string) => {
        setExpandedItemId((prev) => (prev !== id ? id : null));
    };

    const getWines = () => {
        return wineData.map(({ _id, updatedAt, addedByUser, ...props }) => (
            <WineCard
                key={_id}
                addedBy={stringToInitials(addedByUser, '.')}
                image={props?.avatar ? `http://localhost:3001/${props.avatar}` : wineImg}
                date={updatedAt}
                expanded={expandedItemId === _id}
                handleExpandOnClick={() => handleExpandItem(_id)}
                _id={_id}
                showActionButtons={showActionButtons}
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
