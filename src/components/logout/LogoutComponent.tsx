import React, { useState } from 'react';
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useAppRoutes } from '../../routes/useAppRoutes';
import { logoutHandlers } from './logoutHandlers';

const Logout = () => {
    const classes = useStyles();
    const [serverMessage, setServerMessage] = useState('');
    const { goToHome } = useAppRoutes();

    const handleLogout = logoutHandlers(setServerMessage);

    const handleRegret = () => {
        goToHome();
    };

    return (
        <Grid container xs={11} sm={12} justifyContent='center' alignContent='center' className={classes.LoginView}>
            <Grid container className={classes.cardContainer}>
                <Paper className={classes.loginBox}>
                    <Grid
                        container
                        justifyContent='space-evenly'
                        direction='column'
                        alignContent='center'
                        alignItems='center'
                    >
                        <Typography variant='h3' component='div' color='primary'>
                            Log out
                        </Typography>
                        <Typography variant='h5' component='div' color='secondary'>
                            Are you sure?
                        </Typography>
                        <Grid container direction='row' alignItems='center' justifyContent='space-evenly'>
                            <Button
                                className={classes.button}
                                color='primary'
                                variant='outlined'
                                endIcon={<SendIcon />}
                                onClick={(e) => handleLogout(e)}
                            >
                                Yes
                            </Button>
                            <Button
                                className={classes.button}
                                color='primary'
                                variant='outlined'
                                endIcon={<SendIcon />}
                                onClick={handleRegret}
                            >
                                No
                            </Button>
                        </Grid>
                        <Typography variant='h5' component='div' color='primary'>
                            {serverMessage}
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Logout;
const useStyles = makeStyles(({ palette: { primary, background }, breakpoints: { down } }) => ({
    LoginView: {
        height: 'calc(100vh - 64px)',
        maxWidth: 400,
        background: background.default,
        margin: 'auto'
    },
    cardContainer: {
        marginTop: -100,
        [down('md')]: {
            marginTop: 0
        }
    },
    loginBox: {
        padding: '50px 30px',
        borderRadius: 20,
        textAlign: 'center',
        border: `3px solid ${primary.main}`,
        [down('md')]: {
            width: '100%',
            padding: '15px 10px'
        },
        '&>div': {
            height: 400,
            '&>.MuiGrid-root': {
                flexBasis: '25%'
            }
        }
    },
    button: {
        padding: '10px 25px'
    }
}));
