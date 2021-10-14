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
    const [isDrawerOpen, setIsDrawerOpen] = drawerState;
    const { profile } = useProfile();
    const classes = useStyles(isDrawerOpen);

    const { t } = useTranslation();
    const { goToHome } = useAppRoutes();

    const handleClick = () => {
        setIsDrawerOpen(true);
    };
    const handleClose = () => {
        setIsDrawerOpen(false);
    };
    const handleRedirectHome = () => {
        handleClose();
        goToHome();
    };

    return (
        <>
            <AppBar className={classes.NavigationBar} color='transparent' elevation={0}>
                <ToolBar>
                    <Typography onClick={handleRedirectHome} className={classes.title} variant='h6'>
                        WINEYARD
                    </Typography>

                    <Typography className={classes.email}>{profile?.email}</Typography>
                    <LottieButton
                        onClick={isDrawerOpen ? handleClose : handleClick}
                        animationData={hamMenu}
                        isClicked={isDrawerOpen}
                        className={classes.menuButton}
                    />
                </ToolBar>
            </AppBar>

            <Drawer anchor='right' open={isDrawerOpen} onClose={handleClose} className={classes.drawer}>
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
                                to={AppRoutes.PROFILE}
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
/*/
/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type NavigationBarPropsType = { drawerState: [boolean, Dispatch<SetStateAction<boolean>>] };

const useStyles = makeStyles(
    ({ breakpoints: { down }, palette: { primary, defaultSvg, background, text }, typography }) => ({
        NavigationBar: {
            position: 'relative',
            zIndex: 1500,
            width: '100%',
            opacity: 1,
            top: 0,
            display: ({ isOpen }: any) => (isOpen ? 'none' : 'inherit'),
            [down('xs')]: {
                position: 'fixed',
                bottom: '0!important',
                top: 'initial',
                background: background.default
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
            marginLeft: (isDrawerOpen: boolean) => (isDrawerOpen ? 'calc(100vw - 600px)' : 0),
            transition: 'margin .3s',
            '&:hover': { cursor: 'pointer', opacity: 0.7 },
            color: text.secondary,
            [down('md')]: {
                marginLeft: '0 !important'
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
                paddingTop: '50%',
                zIndex: 1
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
                top: 60
            }
        },

        bottomLink: { backgroundColor: background.default, width: '100%', borderRadius: 35 },
        bottomItem: {
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
        }
    })
);
