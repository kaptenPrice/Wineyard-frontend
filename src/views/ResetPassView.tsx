import { Button, makeStyles, TextField, Typography } from '@material-ui/core';
import { Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import LoginComponent from '../components/LoginComponent';
import useFetch from '../components/hooks/useFetch';
import SendIcon from '@material-ui/icons/Send';
import { useEffect } from 'react';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';

const ResetPassView = () => {
    const { token } = useParams<{ token: string }>();
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [tempPassword, setTempPassword] = useState('');
    const [serverMessage, setServerMessage] = useState('');
    const [isValid, setIsValid] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        handleTokenVerify();
    }, []);

    const handleTokenVerify = async () => {
        try {
            const { status, data } = await useFetch(`/user/resetPassword/${token}`, {
                method: 'POST',
                credentials: 'omit'
            });
            if (status === 200) {
                setIsValid(true);
            } else {
                setServerMessage(data?.message);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    //fetchData
    const handleChangePassword = async (e) => {
        e.preventDefault();
        console.log(password, tempPassword);
        if (password === tempPassword) {
            const { data, status, error } = await useFetch(`/user/resetPassword/${token}`, {
                method: 'POST',
                credentials: 'omit',
                body: JSON.stringify({ password })
            });
            if (error) {
                console.log(error);
                setServerMessage(error);
                return;
            } else if (status === 200) {
                setServerMessage(data?.message);
                setPassword('');
                setTempPassword('');
                setTimeout(() => {
                    history.push('/login');
                    setServerMessage('');
                }, 2000);

                return;
            }
        } else {
            setServerMessage('Passwords are different');
        }
    };

    return (
        <>
            <form>
                <Grid
                    container
                    justifyContent='center'
                    alignContent='center'
                    className={classes.LoginView}
                >
                    <Grid className={classes.cardContainer}>
                        <Paper className={classes.loginBox}>
                            <Grid
                                container
                                justifyContent='space-evenly'
                                alignContent='center'
                                alignItems='center'
                                direction='column'
                            >
                                {isValid ? (
                                    <>
                                        <Typography variant='h5' component='div' color='primary'>
                                            Choose new password
                                        </Typography>
                                        <TextField
                                            variant='standard'
                                            color='primary'
                                            type='password'
                                            label='password'
                                            required={true}
                                            value={tempPassword}
                                            onChange={(e) => setTempPassword(e.target.value)}
                                        />
                                        <TextField
                                            variant='standard'
                                            color='primary'
                                            type='password'
                                            label='Repeat password'
                                            required={true}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <Button
                                            endIcon={<SendIcon />}
                                            color='primary'
                                            variant='outlined'
                                            onClick={handleChangePassword}
                                        >
                                            Change password
                                        </Button>
                                        <Typography variant='h5' component='div' color='primary'>
                                            {serverMessage}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant='h5' component='div' color='primary'>
                                            {serverMessage}
                                            {'. \n\n Go to '}
                                            <NavLink className={classes.NavLink} to='/login'>
                                                Login
                                            </NavLink>
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ResetPassView;

const useStyles = makeStyles(
    ({ palette: { primary, background, secondary }, breakpoints: { down } }) => ({
        LoginView: {
            height: 'calc(100vh - 64px)',
            width: '100%',
            background: '#0004',
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
                height: 450,
                '&>.MuiGrid-root': {
                    flexBasis: '25%'
                }
            }
        },
        NavLink: {
            color: secondary.main,
            fontSize: '1.6rem',
            lineHeight: '1.6rem',
            textDecoration: 'underline',
            cursor: 'pointer',
            '&:hover': {
                color: primary.main
            }
        }
    })
);
