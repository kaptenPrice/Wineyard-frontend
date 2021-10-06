import React, { PropsWithChildren } from 'react';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core';

const Snackbar = ({ children }: PropsWithChildren<any>) => {
    const classes = useStyles();

    return (
        <SnackbarProvider
            className={classes.Snackbar}
            maxSnack={2}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            autoHideDuration={10000}
        >
            {children}
        </SnackbarProvider>
    );
};

export default Snackbar;

const useStyles = makeStyles(({}) => ({
    Snackbar: {
        padding: 10
    }
}));
