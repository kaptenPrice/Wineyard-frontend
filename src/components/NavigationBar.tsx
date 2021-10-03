/* eslint-disable no-undef */
import React, { SetStateAction, Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Typography, MenuItem, AppBar, Drawer } from '@material-ui/core';

import ToolBar from '@material-ui/core/Toolbar';
import { useProfile } from '../provider/ProfileProvider';
import { useTranslation } from 'react-i18next';
import hamMenu from '../lottieFiles/hamburger-menu.json';
import LottieButton from './LottieButton';
import { AppRoutes } from '../routes/AppRoutes';
import { useAppRoutes } from '../routes/useAppRoutes';

export const NavigationBar = ({ drawerState }: NavigationBarPropsType) => {
    const [isOpen, setIsOpen] = drawerState;
    const { profile } = useProfile();

    const classes = useStyles({ isDrawerVisible: Boolean(isOpen) });
    const { t } = useTranslation();
    const { goToHome } = useAppRoutes();

    const handleClick = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleRedirectHome = () => {
        goToHome();
    };

    return (
        <>
            <AppBar className={classes.NavigationBar} color='transparent' elevation={0}>
                <ToolBar>
                    <Typography onClick={handleRedirectHome} className={classes.title} variant='h6' color='inherit'>
                        WINEYARD
                    </Typography>
                    <Typography className={classes.email}>{profile?.email}</Typography>
                    <LottieButton
                        onClick={isOpen ? handleClose : handleClick}
                        animationData={hamMenu}
                        isClicked={isOpen}
                        className={classes.menuButton}
                    />
                </ToolBar>
            </AppBar>

            <Drawer anchor='right' open={isOpen} onClose={handleClose} className={classes.drawer}>
                {!profile && (
                    <MenuItem className={classes.menuItem} component={Link} to={AppRoutes.LOGIN} onClick={handleClose}>
                        {t('navbar.login').toUpperCase()}
                    </MenuItem>
                )}
                {profile && (
                    <>
                        <div className={classes.menuItemContainer}>
                            <MenuItem
                                className={classes.menuItem}
                                component={Link}
                                to={AppRoutes.WINES}
                                onClick={handleClose}
                            >
                                {t('navbar.label_one').toUpperCase()}
                            </MenuItem>
                            <MenuItem
                                className={classes.menuItem}
                                component={Link}
                                to={AppRoutes.USERS}
                                onClick={handleClose}
                            >
                                {t('navbar.label_two').toUpperCase()}
                            </MenuItem>
                            <MenuItem
                                className={classes.menuItem}
                                component={Link}
                                to={AppRoutes.SETTINGS}
                                onClick={handleClose}
                            >
                                {t('navbar.settings').toUpperCase()}
                            </MenuItem>
                        </div>
                        <div className={classes.bottomLinkContainer}>
                            <div className={classes.bottomLink}>
                                <MenuItem
                                    className={classes.bottomItem}
                                    component={Link}
                                    to={AppRoutes.LOGOUT}
                                    onClick={handleClose}
                                >
                                    {t('navbar.logout').toUpperCase()}
                                </MenuItem>
                            </div>
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
};

const useStyles = makeStyles(({ breakpoints: { down }, palette: { primary, defaultSvg, background } }) => ({
    NavigationBar: {
        position: 'relative',
        zIndex: 1500,
        width: '100%',
        opacity: 1,
        top: 0,
        // display: ({ isDrawerVisible }: any) => (isDrawerVisible ? 'none' : 'inherit'),
        [down('xs')]: {
            position: 'fixed',
            bottom: '0!important',
            top: 'initial'
        }
    },
    menuButton: {
        marginLeft: 0,
        '& path': {
            fill: defaultSvg.main
        },
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
    drawer: {
        '& > .MuiDrawer-paper': {
            width: 600,
            backgroundColor: primary.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            [down('md')]: {
                width: '100%'
            }
        }
    },

    menuItemContainer: {
        width: '100%',
        paddingBottom: 200,
        [down('md')]: {
            paddingBottom: 0,
            paddingTop: '50%'
        }
    },

    menuItem: {
        padding: 20,
        textAlign: 'center',
        display: 'block',
        fontSize: 24,
        color: '#FFF2E9'
    },

    bottomLinkContainer: {
        width: 150,
        bottom: 20,
        position: 'absolute',
        [down('md')]: {
            top: 40
        }
    },

    bottomLink: { backgroundColor: background.default, width: '100%', borderRadius: 35 },
    bottomItem: {
        // padding: 10,
        // margin:"auto",
        // textAlign: 'center',
        // textJustify:"inter-word",
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 18,
        fontWeight: 500,
        color: primary.main
    },

    email: {
        marginLeft: 'auto',
        [down('xs')]: {
            display: 'none'
        },
        paddingRight: 12
    },

    themeIcon: {
        '&:hover': { cursor: 'pointer' }
    }
}));
/*/
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type NavigationBarPropsType = { drawerState: [boolean, Dispatch<SetStateAction<boolean>>] };

/**menuPaper: {
        height: '30%',
        maxHeight: 'unset',
        width: '15%',
        right: 0,
        top: '0px !important',
        left: 'unset !important',
        position: 'fixed',
        // zIndex:1,
        // minWidth: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 0,
        backgroundColor: primary.main,
        // marginLeft: 20,
        // marginTop: 48,
        opacity: 0.99,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        [down('xs')]: {
            width: '30%',
            marginLeft: 17,
            marginTop: -40,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5
        }
    }, */
