import React, { MouseEventHandler } from 'react';
import { Button, TextField, Typography, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const LoginComponent = ({
    isResetPasswordMode,
    email,
    setEmail,
    password,
    setPassword,
    handleClick,
    handleRegister,
    serverMessage
}: LoginComponentPropsType) => {
    return (
        <Grid
            container
            justifyContent='space-between'
            alignContent='center'
            alignItems='center'
            direction='column'
        >
            <Typography variant='h3' component='div' color='primary'>
                {isResetPasswordMode ? 'Reset password' : 'Log in'}
            </Typography>
        
            <TextField
                variant='standard'
                color='primary'
                type='email'
                label='Email'
                name='email'
                autoComplete={isResetPasswordMode ? 'off' : 'on'}
                required={true}
                value={email}
                onChange={setEmail}
            />
            {!isResetPasswordMode && (
                <TextField
                    variant='standard'
                    color='primary'
                    label='Password'
                    type='password'
                    required={true}
                    value={password}
                    onChange={setPassword}
                />
            )}
            <Grid container item direction='column' xs={4} justifyContent='space-between'>
                <Button
                    color='primary'
                    variant='outlined'
                    endIcon={<SendIcon />}
                    formAction='login'
                    type='submit'
                    onClick={handleClick}
                >
                    {isResetPasswordMode ? 'Reset' : 'Login'}
                </Button>
                {!isResetPasswordMode && (
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
                )}
            </Grid>
            <Typography variant='h6' component='div' color='primary'>
                {serverMessage}
            </Typography>
        </Grid>
    );
};

export default LoginComponent;

export type LoginComponentPropsType = {
    isResetPasswordMode?: boolean;
    email: string;
    setEmail: (e: any) => void;
    password?: string;
    setPassword?: (e: any) => void;
    handleClick: MouseEventHandler<HTMLButtonElement>;
    handleRegister?: MouseEventHandler<HTMLButtonElement>;
    serverMessage?: string;
};
