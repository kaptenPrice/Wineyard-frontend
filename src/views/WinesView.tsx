import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Wines } from '../components/Wines';

const WinesView = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.viewRoot}>
            <Grid container item xs={12} md={9} lg={7} xl={6} className={classes.titleRoot}>
                <Grid className={classes.titleContainer}>
                    <Typography gutterBottom className={classes.title}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium ea earum debitis illo
                        sapiente quas tempore dolorum, perferendis numquam iusto iure, iste sed consectetur quaerat
                        quisquam unde cumque similique klum.
                    </Typography>
                </Grid>
            </Grid>
            <Wines />
        </Grid>
    );
};

export default WinesView;

const useStyles = makeStyles(({ breakpoints: { down, between }, typography, palette }) => ({
    viewRoot: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        marginBottom: 100,
        padding: 50,
        [between('xs', 'md')]: {
            padding: 0,
            marginTop: 20,
            marginBottom: 400
        }
    },
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
        color: palette.text.primary,
        [down('sm')]: {
            ...typography.h6
        }
    }
}));
