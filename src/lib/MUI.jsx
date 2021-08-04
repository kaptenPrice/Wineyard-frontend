import React, { useState } from 'react';
import '../App.css';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import SendIcon from '@material-ui/icons/Send';
import AddIcon from '@material-ui/icons/Add';
import AddedIcon from '@material-ui/icons/CheckBoxRounded';

import {
    makeStyles,
    ThemeProvider,
    createTheme
} from '@material-ui/core/styles';
import CheckBox from '@material-ui/core/Checkbox';
import FormControllLabel from '@material-ui/core/FormControlLabel';
import { green, orange } from '@material-ui/core/colors';
import 'fontsource-roboto';
import {
    TextField,
    Typography,
    Container,
    Paper,
    Grid
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export const MUI = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState(undefined);

    // const styles = useStyles();
    const CheckBoxEx = () => {
        return (
            <FormControllLabel
                control={
                    <CheckBox
                        icon={<AddIcon />}
                        // checkedIcon={<AddIcon />}
                        onChange={() =>
                            isChecked
                                ? setIsChecked(false)
                                : setIsChecked(true)
                        }
                        checked={isChecked}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                }
                label={isChecked ? 'Added' : 'Add'}
            />
        );
    };
    return (
        <div style={{ marginTop: 55, textAlign: 'center' }}>
            <ThemeProvider theme={theme}>
                <Container maxWidth='xl'>
                    {/* <div className="App"> */}
                    <header className='App-header'>
                        <AppBar color='secondary'>
                            <ToolBar>
                                <IconButton>
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant='h6'>
                                    WineYard
                                </Typography>
                                <Button color='default'>Login</Button>
                            </ToolBar>
                        </AppBar>
                        <Typography variant='h3'>WineYard</Typography>
                        <Typography variant='h4' component='div'>
                            Log in
                        </Typography>
                        <TextField
                            variant='filled'
                            color='secondary'
                            type='password'
                        />{' '}
                        <TextField
                            variant='filled'
                            color='secondary'
                            type='email'
                            label='Email'
                            value={email}
                        />
                        <ButtonGroup
                            size='large'
                            variant='contained'
                            color='primary'
                        >
                            <Button
                                color='secondary'
                                endIcon={<SaveIcon />}
                            >
                                Save
                            </Button>
                            <Button endIcon={<SendIcon />}>Send</Button>
                        </ButtonGroup>
                        <Grid
                            container
                            spacing={10}
                            justifyContent='center'
                        >
                            <Grid item xs={3} sm={6}>
                                <Paper
                                    style={{ height: 75, width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={3} sm={6}>
                                <Paper
                                    style={{ height: 75, width: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={3} sm={6}>
                                <Paper
                                    style={{ height: 75, width: '100%' }}
                                />
                            </Grid>
                        </Grid>
                        <CheckBoxEx />
                    </header>
                    {/* </div> */}
                </Container>
            </ThemeProvider>
        </div>
    );
};
const theme = createTheme({
    typography: {
        h3: {
            fontSize: 42,
            marginBottom: 30
        },
        h4: {
            fontSize: 24,
            marginBottom: 20
        }
    },

    palette: {
        primary: {
            main: green[50]
        },
        secondary: {
            main: orange[100]
        }
    }
});

// const useStyles = makeStyles(theme) => ({
//     main: {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center'
//     },
//     textField: {
//         margin: theme.spacing(5)
//     },
//     button: {
//         margin: 5    },
//     checkBox: {
//         margin: theme.spacing(2)
//     }
// }));
