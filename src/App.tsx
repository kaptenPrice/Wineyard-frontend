import React from 'react';
// import { MUI } from './components/MUI';
import { NavigationBar } from './components/NavigationBar';
// import MyRouter from './components/Router';
import './App.css';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { blue, green, orange, grey } from '@material-ui/core/colors';
import Routing from './Routing';
import ProfileProvider from './global/provider/ProfileProvider';
import { Palette } from '@material-ui/icons';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ProfileProvider>
                <Routing />
            </ProfileProvider>
        </ThemeProvider>
    );
}

export default App;

const theme = createTheme({
    typography: {
        h2: {
            fontSize: 52,
            marginBottom: 40,
            color: '#A9A9A9'
        },
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
            main: blue[200]
        },
        secondary: {
            main: orange[200]
        }
    }
});
