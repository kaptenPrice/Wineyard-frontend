import { makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useProfile } from '../provider/ProfileProvider';
import { AppRoutes } from '../routes/AppRoutes';
import CollectionSvg from './svg/CollectionSvg';
import ProfileSvg from './svg/ProfileSvg';
import ProfileComponent from './svg/ProfileSvg';
import SettingsSvg from './svg/SettingsSvg';

const HomeComponent = () => {
    const { fetchProfile, profile } = useProfile();
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));

    return (
        <div className={classes.mainDiv}>
            <motion.div className={classes.header} animate={{ y: 30 }}>
                {profile ? (
                    <Typography variant={!isSmallScreen ? 'h6' : 'body2'} color='secondary'>
                        {t('home_welcome')} {profile?.email}
                    </Typography>
                ) : (
                    <Typography variant={!isSmallScreen ? 'h6' : 'body2'} color='secondary'>
                        {t('home_welcome')}
                    </Typography>
                )}
            </motion.div>

            {/*   <div className={classes.linkContainer}>
                <motion.div className={classes.linkHolder}>
                    <Collection width='12em' height='12em' />
                    <Link className={classes.link} to={AppRoutes.WINES}>
                        Wines
                    </Link>
                </motion.div>
                <motion.div className={classes.linkHolder}>
                    <Collection width='12em' height='12em' />
                </motion.div>
                <motion.div className={classes.linkHolder}></motion.div>
            </div> */}
            <div className={classes.linkContainer}>
                <motion.div
                    className={classes.linkHolder}
                    initial={{ y: -1550 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ translateY: -15 }}
                >
                    <CollectionSvg className={classes.svg} />
                    <Link className={classes.link} to={AppRoutes.WINES}>
                        Wines
                    </Link>
                </motion.div>
                <motion.div
                    className={classes.linkHolder}
                    initial={{ y: -1550 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.35 }}
                    whileHover={{ translateY: -15 }}
                >
                    <ProfileSvg className={classes.svg} />

                    <Link className={classes.link} to={AppRoutes.USERS}>
                        My wines
                    </Link>
                </motion.div>
                <motion.div
                    className={classes.linkHolder}
                    initial={{ y: -1550 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ translateY: -15 }}
                >
                    <SettingsSvg className={classes.svg} />
                    <Link className={classes.link} to={AppRoutes.SETTINGS}>
                        Settings
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default HomeComponent;
const useStyles = makeStyles(({ palette: { background }, breakpoints: { down } }) => ({
    mainDiv: {
        minHeight: '100%'
    },
    header: {
        display: 'flex',
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'center',
        boxShadow: '0 1px 3px #888888',
        background: background.paper,
        marginBottom: 40,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 20,
        borderRadius: 10
    },
    linkContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        margin: '100px 0px 10px 0px',
        [down('xs')]: {
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        }
    },
    linkHolder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        Width: '',
        background: background.paper,
        borderRadius: 10,
        padding:10,
        // boxShadow: '0 1px 5px #888888',
        [down('xs' || 'md')]: {
            width: 192,
            flexDirection: 'column',
            padding: 20,
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 10
        },
        '&:hover': {
            opacity: 0.8,
            borderRadius: 12,
            cursor: 'pointer'
        }
    },
    svg: {
        width: '21em',
        height: '21em',
        [down('xs')]: {
            width: '10em',
            height: '10em'
        }
    },
    link: {
        padding: 80,
        textDecoration: 'none',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#00B9C5'
    }
}));
