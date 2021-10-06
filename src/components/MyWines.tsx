import { Box, Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useProfile } from '../provider/ProfileProvider';
import { WineCard } from './wineCard/WineCard';
import wineImg from '../global/images/wine-image.jpg';
import useFetch from '../lib/useFetch';
import {} from '@material-ui/styles';

const MyWines = () => {
    const classes = useStyles();
    const { profile, fetchProfile } = useProfile();
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);
    const [WinesAddedByCurrent, setWinesAddedByCurrent] = useState([]);
    const { breakpoints } = useTheme();
    const isSmallScreen = useMediaQuery(breakpoints.down('xs'));

    useEffect(() => {
        fetchProfile();
        fetchWinesAddedByCurrentId();
    }, []);
    const fetchWinesAddedByCurrentId = async () => {
        try {
            const response = await useFetch('/wine/getbyaddedby');
            setWinesAddedByCurrent(response.data);
        } catch (error) {
            console.log('error: ', error);
        }
    };
    const handleExpandItem = (id: string) => {
        setExpandedItemId((prev) => (prev !== id ? id : null));
    };
    const handleGetWines = () => {
        return profile.favoriteWines.map(({ _id, ...props }) => (
            <WineCard
                key={_id}
                image={wineImg}
                handleExpandOnClick={() => handleExpandItem(_id)}
                expanded={expandedItemId === _id}
                _id={_id}
                {...props}
            />
        ));
    };
    const handleGetWinesAddedByCurrent = () => {
        return WinesAddedByCurrent.map((element, index) => (
            <p key={element._id}>
                {index + 1} {element.name}
            </p>
        ));
    };

    return (
        <>
            <Grid container xl={12} className={classes.containerWines} id='winesContainer'>
                {handleGetWines()}
            </Grid>
            <Box boxShadow={5} bgcolor='background.paper' m={2} p={2}>
                <Typography variant={!isSmallScreen ? 'h6' : 'body2'} className={classes.addedList}>
                    MY ADDED WINES
                    {handleGetWinesAddedByCurrent()}
                </Typography>
            </Box>
        </>
    );
};

export default MyWines;
const useStyles = makeStyles(({ palette: { primary, defaultSvg }, breakpoints: { down, between }, typography }) => ({
    containerWines: {
        maxWidth: 1720,
        justifyContent: 'center',
        margin: 'auto',
        position: 'relative',
        paddingBottom: 10,
        '& .MuiCard-root': {
            margin: 10
        },
        [down('xs')]: {
            paddingBottom: 66,
            flexDirection: 'column',
            alignContent: 'space-evenly'
        }
    },
    addedList: {
        marginBottom: 50,
        ...typography.h6,
        [between('xs', 'sm')]: {
            ...typography.subtitle2,
            marginBottom: 100
        }
    },

    media: {
        width: '100%',
        display: 'block'
    },
    fileInput: {
        height: 0,
        width: 0,
        opacity: 0
    }
}));
