import { Box, Grid, Typography, useMediaQuery, makeStyles, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useFetch from '../lib/useFetch';
import { WineCard } from '../components/WineCard';
import { useProfile } from '../global/provider/ProfileProvider';
import wineImg from '../global/images/wine-image.jpg';
import { emailToInitials } from '../lib/utils';

const UserView = () => {
    const classes = useStyles();
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));
    const { t, i18n } = useTranslation();
    const { fetchProfile, profile } = useProfile();
    const [expandedItemId, setExpandedItemId] = useState<null | string>(null);

    useEffect(() => {
        fetchProfile();
    }, []);
  
    
    const splittedName = emailToInitials(profile?.email, ".");

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

    return (
        <>
            <Box boxShadow={5} bgcolor='background.paper' m={2} p={2}>
                <Typography variant={!isSmallScreen ? 'h6' : 'body2'} color='primary'>
                    {t('home_welcome')} {splittedName}
                </Typography>
            </Box>
            <Grid container xl={5} className={classes.container} id='winesContainer'>
                {handleGetWines()}
            </Grid>
        </>
    );
};

export default UserView;

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
