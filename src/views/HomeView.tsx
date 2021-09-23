import React from 'react';
import { Grid, Typography, Paper, Box, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import { useProfile } from '../global/provider/ProfileProvider';
import { useTranslation } from 'react-i18next';

const Home = () => {
    const { fetchProfile, profile } = useProfile();
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));

 

    return (
        <>
            <Grid container direction='column'>
                <Box boxShadow={5} bgcolor='background.paper' m={2} p={2}>
                    {profile ? (
                        <Typography variant={!isSmallScreen ? 'h6' : 'body2'} color='secondary'>
                            {t('home_welcome')} {profile?.email}
                        </Typography>
                    ) : (
                        <Typography variant={!isSmallScreen ? 'h6' : 'body2'} color='secondary'>
                            {t('home_welcome')}
                        </Typography>
                    )}
                </Box>
                <Grid container direction='row' className={classes.container}>
                    <Paper className={classes.animationBox}>
              
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;
const useStyles = makeStyles(({ breakpoints: { down } }) => ({
    container: {
        justifyContent: 'center',
        width: '100%',
        marginTop: 11
        // backgroundColor: 'red'
    },
    animationBox: {
        width: 600,
        height: 460,
        margin: '0px 10px',
        boxShadow: '0 3px 10px #888888',

        [down('xs')]: {
            width: 300,
            height: 250
        }
    }
}));

const lottieStyle = {
    lottieLarge: {
        width: '100%',
        height: '100%'
    },
    lottieSmall: {
        with: '100%',
        height: '100%'
    }
};
