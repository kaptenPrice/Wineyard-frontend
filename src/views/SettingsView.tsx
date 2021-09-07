import { Button, Grid, Paper, Typography, useTheme, makeStyles } from '@material-ui/core';
import React from 'react';
import {} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import LottieButton from '../components/LottieButton';
import { useThemeProvider } from '../global/provider/ThemeProvider';
import themeButton from '../components/lottieFiles/themeButtonSvg.json';

import Flags from 'country-flag-icons/react/3x2';
import Lottie from 'react-lottie';
import { useMediaQuery } from '@material-ui/core';

export const SettingsView = () => {
    const { isDarkMode, setIsDarkMode } = useThemeProvider();
    const classes = useStyles();
    const { t, i18n } = useTranslation();
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };
    const handleChangeTheme = () => {
        setIsDarkMode((isDarkMode: any) => !isDarkMode);
    };

    return (
        <Grid container className={classes.settingsView}>
            <Grid container className={classes.cardContainer}>
                <Paper className={classes.loginBox}>
                    <Typography variant='h3' gutterBottom color='primary'>
                        {t('settings.language')}
                    </Typography>
                    <Grid
                        container
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        direction='row'
                    >
                        <Button variant='text' onClick={() => changeLanguage('en')}>
                            <Flags.GB title='Great Britain' />
                        </Button>

                        <Button variant='text' onClick={() => changeLanguage('sv')}>
                            <Flags.SE title='Sweden' />
                        </Button>
                    </Grid>
                    <hr />
                    <Grid
                        container
                        justifyContent='center'
                        alignContent='center'
                        alignItems='center'
                        direction='column'
                    >
                        <Typography
                            style={{ paddingTop: 20 }}
                            gutterBottom
                            variant='h3'
                            component='div'
                            color='primary'
                        >
                            {t('settings.theme')}
                        </Typography>
                        <LottieButton
                            onClick={handleChangeTheme}
                            className={classes.lottie}
                            animationData={themeButton}
                            isClicked={isDarkMode}
                            lottieProps={{ speed: 5.5 }}
                        />
                    </Grid>
                </Paper>
            </Grid>
            {/* </Grid> */}
        </Grid>
    );
};

const useStyles = makeStyles(({ palette: { primary, background }, breakpoints: { down } }) => ({
    settingsView: {
        justifyContent: 'center',
        alignContent: 'center',
        height: 'calc(100vh - 55px)',
        width: '100%',
        background: background.default
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(1,2,3,0.1)'
    },
    cardContainer: {
        position: 'absolute',
        top: 350,
        height: '30%',
        width: '30%',
        opacity: 0.997,

        [down('xs')]: {
            marginTop: '-100px',
            width: '70%',
            height: '40%'
        }
    },
    loginBox: {
        padding: '50px 30px',
        width: '90%',
        minHeight: '70%',
        borderRadius: 20,
        textAlign: 'center',
        border: `3px solid ${primary.main}`,
        background: background.paper
    },
    lottie: {
        '& svg': {
            margin: 'auto',
            display: 'flex',
            '&>g': {
                transform: 'scale(2) translate(-25%,-25%)'
            }
        }
    }
}));
const lottieStyle = {
    lottieLarge: {
        // display: 'contents',
        width: '70%'
    },
    lottieSmall: { width: '100%' }
};

/**  const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }; 
    
             <Lottie
                options={defaultOptions}
                style={!isSmallScreen ? lottieStyle.lottieLarge : lottieStyle.lottieSmall}
            />
    */
