import { Box, Grid, Typography, useMediaQuery, makeStyles, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFetch from '../components/hooks/useFetch';
import { WineCard } from '../components/WineCard';
import { useProfile } from '../global/provider/ProfileProvider';
import wineImg from '../global/images/wine-image.jpg';

const User = () => {
    const classes = useStyles();
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));
    const { t, i18n } = useTranslation();
    const { fetchProfile, profile } = useProfile();

    const [favoriteWines, setFavoriteWines] = useState([]);
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);

    const splitter = (email: string) => {
        const name = email.split('@')[0].split('.');
        const init = (name[0].split('')[0] + name[1].split('')[0]).toUpperCase();
        return init;
    };
    useEffect(() => {
        showProfile();
    }, []);

    const showProfile = async () => {
        const {
            data: { profile },
            status,
            error
        } = await useFetch('/profile');

        if (status === 200) {
            const { email, favoriteWines } = profile;
            setFavoriteWines(favoriteWines);
        } else {
            console.log('error ', error);
        }
    };
    const handleExpandItem = (id: string) => {
        setExpandedItemId((prev) => (prev !== id ? id : null));
    };
    const handleGetWines = () => {
        return favoriteWines.map(({ _id, ...props }) => (
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

    return (
        <>
            <Box boxShadow={5} bgcolor='background.paper' m={2} p={2}>
                <Typography variant={!isSmallScreen ? 'h6' : 'body2'} color='primary'>
                    {t('home_welcome')} {splitter(profile?.email)}
                </Typography>
            </Box>
            <Grid container xl={5} className={classes.container} id='winesContainer'>
                {handleGetWines()}
            </Grid>
        </>
    );
};

export default User;

const useStyles = makeStyles(({ breakpoints: { down } }) => ({
    container: {
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
    }
}));
