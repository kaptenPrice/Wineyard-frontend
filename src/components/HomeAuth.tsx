import React from 'react';
import { makeStyles, Typography, useMediaQuery, useTheme, Link, Grid } from '@material-ui/core';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../provider/ProfileProvider';
import { AppRoutes } from '../routes/AppRoutes';
import CollectionSvg from '../svg/CollectionSvg';
import ProfileSvg from '../svg/ProfileSvg';
import SettingsSvg from '../svg/SettingsSvg';
import Title from './Title';
import { titleHomeViewAuth } from '../content/titles';

const HomeComponentAuth = () => {
    const { profile } = useProfile();
    const { t, i18n } = useTranslation();
    const classes = useStyles();
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));

    return (
        <>
            <motion.div className={classes.header} animate={{ y: 30 }}>
                <Typography variant={!isSmallScreen ? 'h6' : 'body2'} color='secondary'>
                    {t('home_welcome')}
                    {/* {profile?.email} */}
                </Typography>
            </motion.div>
            {/* <div className={classes.overLay} /> */}
            <Title
                classRoot={classes.titleRoot}
                classContainer={classes.titleContainer}
                classTitle={classes.title}
            >
                {"homeViewAuthTitle"}
            </Title>

            <div className={classes.linkContainer}>
                <motion.div
                    className={classes.linkHolder}
                    initial={{ y: -1550 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ translateY: -15 }}
                >
                    <CollectionSvg className={classes.svg} />
                    <Link className={classes.link} href={AppRoutes.WINES}>
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

                    <Link className={classes.link} href={AppRoutes.PROFILE}>
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
                    <Link className={classes.link} href={AppRoutes.SETTINGS}>
                        Settings
                    </Link>
                </motion.div>
            </div>
        </>
    );
};

export default HomeComponentAuth;
const useStyles = makeStyles(({ palette: { background, text }, breakpoints: { down, between }, typography }) => ({
    titleRoot: {
        marginLeft: 40,
        marginBottom: 160,
        marginTop: 80,
        paddingBottom: 40,

        borderBottom: '1px solid #222222',
        [between('xs', 'md')]: {
            width: '80%',
            margin: 'auto',
            marginBottom: 80
        }
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        position: 'relative'
    },
    title: {
        ...typography.h3,
        color: text.primary,
        [down('sm')]: {
            ...typography.h6
        }
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
        marginBottom: 100,

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
        maxHeight: '25%',
        background: background.paper,
        borderRadius: 10,
        padding: '5px 120px',
        margin: 10,
        [down('xs' || 'md')]: {
            width: 192,
            flexDirection: 'column',
            padding: '20px 60px',
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
            width: '15em',
            height: '12em'
        }
    },
    link: {
        padding: '30px',
        textDecoration: 'none',
        fontSize: 24,
        fontWeight: 'bold',
        color: text.secondary
    }
}));
