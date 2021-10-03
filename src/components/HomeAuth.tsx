import React from 'react';
import { makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useProfile } from '../provider/ProfileProvider';
import { AppRoutes } from '../routes/AppRoutes';
import CollectionSvg from "../svg/CollectionSvg"
import ProfileSvg from '../svg/ProfileSvg';
import SettingsSvg from '../svg/SettingsSvg';
import bgImage from '../global/images/backgroundImage1.jpg';

const HomeComponentAuth = () => {
    const { profile } = useProfile();
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));

    return (
        <div className={classes.mainDiv}>
            <div className={classes.overLay} />
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
            <div>
                <div
                    style={{
                        zIndex: 1,
                        position: 'absolute',
                        left: '10%',
                        right: '10%',
                        height: 200,
                        backgroundColor: '#fff',
                        color: 'white',
                        padding: 0
                    }}
                ></div>
            </div>
        </div>
    );
};

export default HomeComponentAuth;
const useStyles = makeStyles(({ palette: { background }, breakpoints: { down } }) => ({
    mainDiv: {
        position: 'relative',
        height: 1972,
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness("50%")'
        // zIndex: 1
    },
    overLay: {
        opacity: 0.75,
        backgroundColor: 'black',
        position: 'absolute',
        left: 0,
        top: 0,
        height: 1972,
        width: '100%'
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
        borderRadius: 10,
        opacity: 0.9
    },
    linkContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignContent: 'center',
        margin: '100px 0px 10px 0px',
        opacity: 0.9,

        [down('md')]: {
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
        maxHeight: '25%',
        // backgroundColor:"red",
        background: background.paper,
        borderRadius: 10,
        padding: 40,
        margin:10,
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
        padding: 20,
        textDecoration: 'none',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#00B9C5'
    }
}));