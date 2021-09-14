import React, { useEffect, useRef, useState } from 'react';
import { useProfile } from '../global/provider/ProfileProvider';
import IsLoading from '../components/IsLoading';
import useFetch from '../lib/useFetch';
import { Grid, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import wineImg from '../global/images/wine-image.jpg';
import { WineCard } from '../components/WineCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { io } from 'socket.io-client';
import { useSocket } from '../lib/useSocket';
import { NewLineKind } from 'typescript';

const WinesView = () => {
    const [wineData, setWineData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(10);
    const [actualSize, setActualSize] = useState(0);

    //const [likedItemId, setLikedItem] = useState(null);

    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));
    const classes = useStyles();

    useEffect(() => {
        fetchWines();
    }, []);
    useEffect(() => {
        // openSocket();
    }, []);

    useSocket('wine-liked', (newLikedWineData) => {
        setWineData((current) =>
            current.map((currentWine) => (currentWine._id === newLikedWineData._id ? newLikedWineData : currentWine))
        );
    });

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
        <Grid container xl={10} className={classes.container} id='winesContainer'>
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

export default WinesView;
const useStyles = makeStyles(({ breakpoints: { down } }) => ({
    container: {
        maxWidth: 1720,
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
