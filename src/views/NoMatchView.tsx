import { Paper } from '@material-ui/core';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

const NoMatchView = () => {
    const location = useLocation();
    const classes = useStyles();
    return (
        <Grid>
            <Grid container justifyContent='center' alignContent='center' className={classes.LoginView}>
                <Grid className={classes.cardContainer}>
                    <Paper className={classes.loginBox}>
                        <Grid
                            container
                            justifyContent='space-evenly'
                            direction='column'
                            alignContent='center'
                            alignItems='center'
                        >
                            <Typography variant='h5' component='div' color='error'>
                                {location.pathname}
                            </Typography>
                            <Typography variant='h3' component='div' color='error' display='block'>
                                404 (not found)
                            </Typography>
                            <Grid container direction='row' alignItems='center' justifyContent='space-evenly'></Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NoMatchView;
const useStyles = makeStyles(({ palette: { primary, background }, breakpoints: { down } }) => ({
    LoginView: {
        height: 'calc(100vh - 64px)',
        width: '100%',
        background: background.default,
        overflow: 'hidden'
    },
    cardContainer: {
        marginTop: -100,
        [down('xs')]: {
            marginTop: 0
        }
    },
    loginBox: {
        padding: '50px 30px',
        width: 400,
        borderRadius: 20,
        textAlign: 'center',
        border: `3px solid ${primary.main}`,
        '&>div': {
            height: 400,
            '&>.MuiGrid-root': {
                flexBasis: '25%'
            }
        }
    }
}));
