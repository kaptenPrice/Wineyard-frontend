import React, { useEffect, useState } from 'react';
import useFetch from '../lib/useFetch';
import { Grid, makeStyles } from '@material-ui/core';
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
    const classes = useStyles();

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
        setWineData((current) => [...current, newData]);
    });

    useSocket('wine-deleted', (newData) => {
        setWineData((current) => current.filter((wine) => wine._id !== newData._id));
    });

    const handleExpandItem = (id: string) => {
        setExpandedItemId((prev) => (prev !== id ? id : null));
    };

    const getWines = () => {
        return wineData.map(({ _id, updatedAt, addedByUser, ...props }) => (
            <WineCard
                key={_id}
                addedBy={addedByUser && stringToInitials(addedByUser.email, '.')}
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
        <Grid container xl={12} className={classes.container} id='winesContainer'>
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
        </Grid>
    );
};
const useStyles = makeStyles(({ breakpoints: { down }, palette }) => ({
    container: {
        background: palette.background.paper,
        // maxWidth: 1720,
        justifyContent: 'center',
        margin: 'auto',
        position: 'relative',
        paddingBottom: 10,
        '& .infinite-scroll-component,.infinite-scroll-component__outerdiv': {
            display: 'contents'
        },
        '&>div>div>.MuiCard-root': {
            margin: 15
        },
        [down('xs')]: {
            paddingBottom: 66,
            flexDirection: 'column',
            alignContent: 'space-evenly'
        }
    }
}));
