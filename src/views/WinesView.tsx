import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Wines } from '../components/wines/Wines';
import Title from '../components/Title';
import { titleWinesView } from '../content/titles';
const WinesView = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.viewRoot}>
        <>
            <Title
                classRoot={classes.titleRoot}
                classContainer={classes.titleContainer}
                classTitle={classes.title}
            >
                {titleWinesView}
            </Title>
            <Wines />
        </>
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
