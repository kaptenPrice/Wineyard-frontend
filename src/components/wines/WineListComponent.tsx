import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import wineImg from '../../global/images/wine-image.jpg';
import WineCardComponent from '../wineCard/WineCardComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSocket } from '../../lib/useSocket';
import { stringToInitials } from '../../lib/utils';
import { winesHandlers } from './winesHandlers';
import TypographyComp from '../TypographyComp';

export const WineListComponent = () => {
    const [wineData, setWineData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSize, setCurrentSize] = useState(10);
    const [actualSize, setActualSize] = useState(0);
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);
    const showActionButtons: boolean = true;
    const [showActionButton, setShowActionButton] = useState(true);

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

    const handleExpandOnClick = (id?: string) => {
        setExpandedItemId((prev) => (prev !== id ? id : null));
    };

    const handleClickOutside = (_id) => {
        if (expandedItemId === _id) {
            setExpandedItemId(null);
        }
    };

    const getWines = () => {
        return wineData.map(({ _id, updatedAt, addedByUser, ...props }) => (
            <WineCardComponent
                key={_id}
                addedBy={addedByUser && stringToInitials(addedByUser.email, '.')}
                image={props?.avatar ? process.env.REACT_APP_API_URL_DEV + `/${props.avatar}` : wineImg}
                date={updatedAt}
                expanded={expandedItemId === _id}
                handleExpandOnClick={() => handleExpandOnClick(_id)}
                _id={_id}
                showActionButtons={showActionButtons}
                buttonState={[showActionButton, setShowActionButton]}
                onClickAway={() => handleClickOutside(_id)}
                {...props}
            />
        ));
    };
    //TODO ADD KEY to Transfiles
    return (
        <>
            <Grid container xl={12} className={classes.container} direction='row' id='winesContainer'>
                <Grid xs={12} item className={classes.titleContainer}>
                    <TypographyComp gutterBottom className={classes.title}>
                        <span>-----</span>
                        {'Our Wines'}
                    </TypographyComp>
                </Grid>
                <InfiniteScroll
                    next={() => fetchWines(currentPage, currentSize, setWineData, setActualSize, setCurrentPage)}
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
        color: text.secondary,

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
