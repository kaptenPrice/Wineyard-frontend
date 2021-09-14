import React, { useEffect, useRef, useState } from 'react';
 import { Grid, makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import { Wines } from '../components/Wines';


const WinesView = () => {
    const classes = useStyles();
 
    return (
        <Grid container xl={10} className={classes.container} id='winesContainer'>
           <Wines/>
        </Grid>
    );
};

export default WinesView;
const useStyles = makeStyles(({ breakpoints: { down } }) => ({
    container: {
        maxWidth: 1720,
        justifyContent: 'center',
        margin: 'auto',
        position: 'relative',
        paddingBottom: 10,
        '& .infinite-scroll-component,.infinite-scroll-component__outerdiv': {
            display: 'contents'
        },
        '&>div>div>.MuiCard-root': {
            margin: 15
        },
        [down('xs')]: {
            paddingBottom: 66,
            flexDirection: 'column',
            alignContent: 'space-evenly'
        }
    }
}));
