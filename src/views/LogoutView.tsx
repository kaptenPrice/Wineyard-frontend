import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import useFetch from '../lib/useFetch';
import { useProfile } from '../provider/ProfileProvider';
import { AppRoutes } from '../routes/AppRoutes';
import useMyHistory from '../hooks/useMyHistory';
import { useAppRoutes } from '../routes/useAppRoutes';

const LogoutView = () => {
    const { profile, setProfile } = useProfile();
    const classes = useStyles();
    const history = useMyHistory();
    const [serverMessage, setServerMessage] = useState('');
    const [seconds, setSeconds] = useState(5);
    const { goToHome } = useAppRoutes();

    useEffect(() => {
        if (seconds === 0) {
            history.replace('/');
        }
    }, [seconds]);

    const handleLogout = async () => {
        const response = await useFetch('/logout');
        if (response.status === 200) {
            setServerMessage(response.data?.message);
            setProfile(null);

            setInterval(() => {
                setSeconds((seconds) => seconds - 1);
            }, 1000);
        } else {
            setServerMessage(response.data.message);
        }
    };

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
                        {profile && (
                            <>
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
                                        onClick={handleLogout}
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
                            </>
                        )}
                        <Typography variant='h5' component='div' color='primary'>
                            {serverMessage} {!profile && seconds}
                        </Typography>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LogoutView;
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
