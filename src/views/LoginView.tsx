import React, { useState } from 'react';
import { Button, Grid, Modal, Paper, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { useProfile } from '../global/provider/ProfileProvider';
import useFetch from '../lib/useFetch';
import LoginComponent, { LoginComponentPropsType } from '../components/LoginComponent';
import ReactCardFlip from 'react-card-flip';

const LoginView = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [serverMessage, setServerMessage] = useState('');
    const history = useHistory();
    const { fetchProfile, profile } = useProfile();
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlipp = () => {
        setIsFlipped((current) => !current);
    };

    const handleLogin: LoginComponentPropsType['handleClick'] = async (e) => {
        e.preventDefault();
        try {
            const response = await useFetch('/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            if (response.status === 200) {
                fetchProfile();
                history.push('/home');
            } else {
                setServerMessage(response?.data.message);
            }
        } catch (error) {
            setServerMessage("Server seems to be tired, visit later please")
            console.log({error:error, message: "error rån logon"});
        }
    };

    const handleRegister: LoginComponentPropsType['handleRegister'] = async (e) => {
        e.preventDefault();
        try {
            const response = await useFetch('/register', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            console.log(response);
            if (response.status === 200) {
                setServerMessage(response?.data.message);
            } else {
                setServerMessage(response?.data.message);
            }
        } catch (error) {
            console.log('error', error);
        }
    };
    const handleForgottPassword: LoginComponentPropsType['handleRegister'] = async (e) => {
        e.preventDefault();
        try {
            const response = await useFetch('/user/forgotpassword', {
                method: 'POST',
                body: JSON.stringify({ email })
            });
            if (response.status === 200) {
                setServerMessage(response?.data.message);

                setTimeout(() => {
                    setIsFlipped(false);
                    setServerMessage('');
                }, 3000);
            } else {
                setServerMessage(response?.data.message);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <form autoComplete='on'>
            <Grid
                container
                justifyContent='center'
                alignContent='center'
                className={classes.LoginView}
            >
                <Grid className={classes.cardContainer}>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection='horizontal'>
                        <Paper className={classes.loginBox} style={{ opacity: isFlipped ? 0 : 1 }}>
                            <LoginComponent
                                email={email}
                                setEmail={(input) => setEmail(input.target.value)}
                                password={password}
                                setPassword={(input) => setPassword(input.target.value)}
                                handleClick={handleLogin}
                                handleRegister={handleRegister}
                                serverMessage={serverMessage}
                            />
                            <Typography
                                variant='button'
                                className={classes.link}
                                onClick={handleFlipp}
                            >
                                Reset password
                            </Typography>
                        </Paper>
                        <Paper className={classes.loginBox} style={{ opacity: isFlipped ? 1 : 0 }}>
                            <LoginComponent
                                isResetPasswordMode={true}
                                email={email}
                                setEmail={(input) => setEmail(input.target.value)}
                                handleClick={handleForgottPassword}
                                serverMessage={serverMessage}
                            />
                            <Typography
                                variant='button'
                                onClick={handleFlipp}
                                className={classes.link}
                            >
                                Log in
                            </Typography>
                        </Paper>
                    </ReactCardFlip>
                </Grid>
            </Grid>
        </form>
    );
};

export default LoginView;
const useStyles = makeStyles(({ palette: { primary, background }, breakpoints: { down } }) => ({
    LoginView: {
        height: 'calc(100vh - 64px)',
        width: '100%',
        background:background.default,
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
        background:background.paper,

        '&>div': {
            height: 450,
            '&>.MuiGrid-root': {
                flexBasis: '25%'
            }
        }
    },
    link: {
        textDecoration: 'underline',
        cursor: 'pointer',
        color: '#2139A5',
        '&:hover': {
            color: primary.main
        }
    }
}));
