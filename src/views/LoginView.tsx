import React, { useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Grid,
    Paper
} from '@material-ui/core';

import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useProfile } from '../global/provider/ProfileProvider';
import useFetch from '../lib/useFetch';

const useStyles = makeStyles(({ palette: { primary } }) => ({
    LoginView: {
        background: '#0007',
        height: 'calc(100vh - 100px)',
        width: '100%',
        
    },
    loginBox: {
        marginTop: -100,
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
    }
}));

const LoginView = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const { fetchProfile, profile } = useProfile();

    const handleLogin = async (e) => {
        try {
            const response = await useFetch('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            if (response.status === 200) {
                fetchProfile();
                history.push('/home');
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const body = JSON.stringify({ email, password });
        fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body
        })
            .then((response) => console.log(response.status))
            .catch((error) => console.log('error', error));
    };

    return (
        <form>
            <Grid
                container
                justifyContent='center'
                alignContent='center'
                className={classes.LoginView}
            >
                <Paper className={classes.loginBox}>
                    <Grid
                        container
                        justifyContent='space-between'
                        alignContent='center'
                        alignItems='center'
                        direction='column'
                    >
                        <Typography
                            variant='h3'
                            component='div'
                            color='primary'
                        >
                            Log in
                        </Typography>
                        <TextField
                            variant='standard'
                            color='primary'
                            type='email'
                            label='Email'
                            value={email}
                            onChange={(e) =>
                                setEmail(e.currentTarget.value)
                            }
                            /*        error={
                                email === ''
                                    ? false
                                    : !email.match(
                                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                                      )
                            } */
                        />
                        <TextField
                            variant='standard'
                            color='primary'
                            label='Password'
                            type='password'
                            value={password}
                            onChange={(e) =>
                                setPassword(e.currentTarget.value)
                            }
                        />
                        <Grid
                            container
                            item
                            direction='column'
                            xs={4}
                            justifyContent='space-between'
                        >
                            <Button
                                color='primary'
                                variant='outlined'
                                endIcon={<SendIcon />}
                                formAction='login'
                                type='submit'
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                            <Button
                                endIcon={<SendIcon />}
                                color='primary'
                                variant='outlined'
                                formAction='signup'
                                type='submit'
                                onClick={handleRegister}
                            >
                                Signup
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </form>
    );
};

export default LoginView;
