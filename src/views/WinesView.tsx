import React, { useEffect, useState } from 'react';
import { useProfile } from '../global/provider/ProfileProvider';
import IsLoading from '../components/IsLoading';
import useFetch from '../lib/useFetch';
import {
    Grid,
    Typography,
    Paper,
    Box,
    makeStyles,
    useTheme,
    useMediaQuery
} from '@material-ui/core';
import animationData from '../components/lottieFiles/73294-adaptive-website-v2.json';
import Lottie from 'react-lottie';

//Fetch data from /wine/getall and map the list
const Wines = () => {
    // const [wines, setWines] = useState(null);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setWines({});
    //     }, 3000);
    // }, []);

    useEffect(() => {
        // window.history.replaceState("","", "/")
    }, []);
    const {
        breakpoints: { down }
    } = useTheme();
    const isSmallScreen = useMediaQuery(down('xs'));
    const classes = useStyles();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <Grid container className={classes.root}>
            <Lottie
                options={defaultOptions}
                style={!isSmallScreen ? lottieStyle.lottieLarge : lottieStyle.lottieSmall}
            />
            <Grid container direction='column'>
                <Grid className={classes.background}>
                    <Box className={classes.box} boxShadow={5} bgcolor='background.paper' p={2}>
                        <Typography
                            variant={!isSmallScreen ? 'h3' : 'h4'}
                            gutterBottom
                            color='secondary'
                        >
                            This is the Wine page
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Wines;
const useStyles = makeStyles(({ breakpoints: { down } }) => ({
    root: {
        position: 'relative',
        height: '100%',
        overflow: 'hidden'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(1,2,3,0.3)'
    },
    box: {
        position: 'absolute',
        top: 600,
        left: 600
    }
}));

export const lottieStyle = {
    lottieLarge: {
        // display: 'contents',
        width: '70%'
    },
    lottieSmall: {}
};
