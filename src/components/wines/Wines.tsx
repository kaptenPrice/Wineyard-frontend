import React, { useEffect, useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import wineImg from '../../global/images/wine-image.jpg';
import { WineCard } from '../wineCard/WineCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSocket } from '../../lib/useSocket';
import { stringToInitials } from '../../lib/utils';
import { winesHandlers } from './winesHandlers';

export const Wines = () => {
    const [wineData, setWineData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(10);
    const [actualSize, setActualSize] = useState(0);
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);
    const showActionButtons: boolean = true;
    
    const classes = useStyles();
    const { fetchWines } = winesHandlers();

    useEffect(() => {
        fetchWines(currentPage, currentSize, setWineData, setActualSize, setCurrentPage);
    }, []);

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
        <>
            <Grid container xl={12} className={classes.container} direction='row' id='winesContainer'>
                <Grid xs={12} item className={classes.titleContainer}>
                    <Typography gutterBottom className={classes.title}>
                        <span>-----</span>Our Wines
                    </Typography>
                </Grid>
                <InfiniteScroll
                    next={()=>fetchWines(currentPage, currentSize, setWineData, setActualSize, setCurrentPage)}
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
        </>
    );
};
const useStyles = makeStyles(({ breakpoints: { down }, palette: { background, text }, typography }) => ({
    container: {
        background: background.paper,
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
    },
    titleContainer: {
        marginBottom: 50,
        marginLeft: 50,
        marginTop: 40
    },

    title: {
        ...typography.h5,
        fontWeight: 300,
        color: text.primary,

        letterSpacing: '0.19rem',
        [down('sm')]: {
            ...typography.body2
        },
        '&>span': {
            letterSpacing: -4,
            marginRight: 12
        }
    }
}));
