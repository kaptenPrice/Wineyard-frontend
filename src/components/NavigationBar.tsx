/* eslint-disable no-undef */
import React, { useState, forwardRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    Button,
    Grid,
    makeStyles,
    Menu,
    Popover,
    Slide,
    Tab,
    Tabs,
    useTheme, Paper
} from '@material-ui/core';
import { IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import { MenuItem } from '@material-ui/core';
import { useProfile } from '../global/provider/ProfileProvider';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '@material-ui/core';
import { SlideProps } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { useThemeProvider } from '../global/provider/ThemeProvider';
import themeButton from './svg/themeButtonSvg.json';
import { Player as Lottie } from '@lottiefiles/react-lottie-player';

const CustomSlide = forwardRef((props: SlideProps, ref) => {
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('sm'));
    return <Slide {...props} direction={isSmallScreen ? 'up' : 'down'} ref={ref} />;
});

export const NavigationBar = () => {
    const [selectedTab, setSelectedTab]: any = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const { fetchProfile, profile } = useProfile();
    const { isDarkMode, setIsDarkMode } = useThemeProvider();

    const classes = useStyles();
    const history = useHistory();
    const { t, i18n } = useTranslation();

    const handleChange = (event: any, newValue: number) => {
        setSelectedTab(newValue);
    };

    const handleClick = (event: any) => {
        setAnchorEl((current) => (current ? null : event.currentTarget));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRedirectHome = () => {
        history.push('/home');
    };
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);
    };
    const handleChangeTheme = () => {
        setIsDarkMode((isDarkMode) => !isDarkMode);
    };

    return (
        <AppBar className={classes.NavigationBar} color='primary' elevation={anchorEl ? 0 : 3}>
            <ToolBar>
                <Button onClick={handleRedirectHome}>
                    <Typography className={classes.title} variant='h6'>
                        WineYard
                    </Typography>
                </Button>
                {/* <Tabs indicatorColor='primary' value={selectedTab} onChange={handleChange}>
                    <Tab label={t('navbar.label_one')} component={Link} to='/wines' />
                    <Tab label={t('navbar.label_two')} component={Link} to='/users' />
                </Tabs> */}
                {/* <Switch checked={isDarkMode} onChange={handleChangeTheme} /> */}
                <Grid className={classes.themeIcon} onClick={handleChangeTheme}>
                <Lottie
                    //TODO: Fix me please :D
                   
                    autoplay={false}
                    src={themeButton}
                    style={{ height: '40px', width: '40px' }}
                />
                </Grid>
                <Typography className={classes.email}>{profile?.email}</Typography>
                <IconButton className={classes.menuButton} onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
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
                        <Paper>
                            <MenuItem component={Link} to='/wines' onClick={handleClose}>
                                {t('navbar.label_one')}
                            </MenuItem>{' '}
                            <MenuItem component={Link} to='/users' onClick={handleClose}>
                                {t('navbar.label_two')}
                            </MenuItem>{' '}
                            <MenuItem component={Link} to='/logout' onClick={handleClose}>
                                {t('navbar.logout')}
                            </MenuItem>
                        </Paper>
                    )}
                </Menu>
                <Grid className={classes.langChoice}>
                    <Button variant='text' onClick={() => changeLanguage('en')}>
                        EN
                    </Button>
                    <Button variant='text' onClick={() => changeLanguage('sv')}>
                        SV
                    </Button>
                </Grid>
            </ToolBar>
        </AppBar>
    );
};

const useStyles = makeStyles(({ spacing, breakpoints: { down }, palette: { primary } }) => ({
    NavigationBar: {
        position: 'relative',
        zIndex: 1500,
        width: '100%',
        opacity: 0.96,

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
        // flexGrow: 1
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
        [down('sm')]: {
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
        [down('sm')]: {
            display: 'none'
        },
        paddingRight: 12
    },
    langChoice: {
        [down('sm')]: {
            display: 'none'
        }
    },
    themeIcon:{
    }
}));
