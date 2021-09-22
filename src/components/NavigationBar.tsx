/* eslint-disable no-undef */
import React, { useState, forwardRef, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    makeStyles,
    Menu,
    Slide,
    useTheme,
    useMediaQuery,
    Typography,
    MenuItem,
    SlideProps,
    AppBar
} from '@material-ui/core';

import ToolBar from '@material-ui/core/Toolbar';
import { useProfile } from '../global/provider/ProfileProvider';
import { useTranslation } from 'react-i18next';
import { useThemeProvider } from '../global/provider/ThemeProvider';
import hamMenu from './lottieFiles/hamburger-menu.json';
import LottieButton from './LottieButton';

const CustomSlide = forwardRef((props: SlideProps, ref) => {
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('sm'));
    return <Slide {...props} direction={isSmallScreen ? 'up' : 'down'} ref={ref} />;
});

export const NavigationBar = () => {
    const {
        breakpoints: { down }
    } = useTheme();
    // const isSmallScreen = useMediaQuery(down('sm'));
    const lottieRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const { profile } = useProfile();
    const { isDarkMode } = useThemeProvider();

    const classes = useStyles();
    const history = useHistory();
    const { t } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl((current: HTMLAnchorElement) => (current ? null : event.currentTarget));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRedirectHome = () => {
        history.push('/home');
    };

    useEffect(() => {
        lottieRef.current?.anim.goToAndStop(isDarkMode ? 132 : 0, true);
    }, []);

    return (
        <AppBar className={classes.NavigationBar} color='primary' elevation={anchorEl ? 0 : 3}>
            <ToolBar>
                <Typography onClick={handleRedirectHome} className={classes.title} variant='h6' color='secondary'>
                    WINEYARD
                </Typography>
                <Typography className={classes.email}>{profile?.email}</Typography>
                <LottieButton
                    onClick={handleClick}
                    animationData={hamMenu}
                    isClicked={anchorEl}
                    className={classes.menuButton}
                />
                <Menu
                    classes={{ paper: classes.menuPaper }}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    elevation={0}
                    TransitionComponent={CustomSlide}
                    transitionDuration={75}
                >
                    {!profile && (
                        <MenuItem component={Link} to='/login' onClick={handleClose}>
                            {t('navbar.login')}
                        </MenuItem>
                    )}

                    {profile && (
                        <div>
                            <MenuItem component={Link} to='/wines' onClick={handleClose}>
                                {t('navbar.label_one')}
                            </MenuItem>
                            <MenuItem component={Link} to='/users' onClick={handleClose}>
                                {t('navbar.label_two')}
                            </MenuItem>
                            <MenuItem component={Link} to='/settings' onClick={handleClose}>
                                {t('navbar.settings')}
                            </MenuItem>
                            <MenuItem component={Link} to='/logout' onClick={handleClose}>
                                {t('navbar.logout')}
                            </MenuItem>{' '}
                        </div>
                    )}
                </Menu>
            </ToolBar>
        </AppBar>
    );
};

const useStyles = makeStyles(({ breakpoints: { down }, palette: { primary } }) => ({
    NavigationBar: {
        position: 'relative',
        zIndex: 1500,
        width: '100%',
        opacity: 1,
        top: 0,
        [down('xs')]: {
            position: 'fixed',
            bottom: '0!important',
            top: 'initial'
        }
    },
    menuButton: {
        marginLeft: 0,
        [down('xs')]: {
            marginLeft: 'auto'
        }
    },
    title: {
        '&:hover': { cursor: 'pointer' }
    },
    lottie: {
        '& svg': {
            margin: 'auto',
            display: 'flex',
            '&>g': {
                transform: 'scale(2) translate(-25%,-25%)'
            }
        }
    },
    menuPaper: {
        maxHeight: 200,
        maxWidth: 110,
        minWidth: 100,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: primary.main,
        marginLeft: -25,
        marginTop: 48,
        opacity: 0.96,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        [down('xs')]: {
            marginLeft: 17,
            marginTop: -40,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
        }
    },
    menuPopover: {},
    email: {
        marginLeft: 'auto',
        [down('xs')]: {
            display: 'none'
        },
        paddingRight: 12
    },
    langChoice: {
        [down('xs')]: {
            display: 'none'
        }
    },
    themeIcon: {
        '&:hover': { cursor: 'pointer' }
    }
}));
