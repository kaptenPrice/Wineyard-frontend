import React from 'react';
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useThemeProvider } from '../provider/ThemeProvider';
import { GB, SE } from 'country-flag-icons/react/3x2';
import LottieButton from './LottieButton';
import themeButton from '../lottieFiles/themeButtonSvg.json';

const Settings = () => {
    const { isDarkMode, setIsDarkMode } = useThemeProvider();

    const { t, i18n } = useTranslation();
    const classes = useStyles();

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };
    const handleChangeTheme = () => {
        setIsDarkMode((isDarkMode: boolean) => !isDarkMode);
    };
    return (
        <Grid container className={classes.settingsView}>
            <Grid container className={classes.cardContainer}>
                <Paper className={classes.loginBox}>
                    <Typography variant='h3' gutterBottom className={classes.title}>
                        {t('settings.language')}
                    </Typography>
                    <Grid container justifyContent='center' alignContent='center' alignItems='center' direction='row'>
                        <Button variant='text' onClick={() => changeLanguage('en')}>
                            <GB title='Great Britain' />
                        </Button>

                        <Button variant='text' onClick={() => changeLanguage('sv')}>
                            <SE title='Sweden' />
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
                        <Typography style={{ paddingTop: 20 }} gutterBottom variant='h3' className={classes.title}>
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
        </Grid>
    );
};

export default Settings;
const useStyles = makeStyles(({ palette: { primary, background, text, defaultSvg }, breakpoints: { down } }) => ({
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
        border: `3px solid ${defaultSvg.main}`,
        background: background.paper
    },
    title: {
        color: text.primary
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
