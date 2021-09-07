import React, { Suspense } from 'react';
import Routing from './routes/Routing';
import ProfileProvider from './global/provider/ProfileProvider';
import { makeStyles } from '@material-ui/core';
import ThemeProvider from './global/provider/ThemeProvider';
import { blue, orange } from '@material-ui/core/colors';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';


const App = () => {
    return (
        <Suspense fallback={<h1 style={{ color: 'black' }}>...loading</h1>}>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <ProfileProvider>
                        <Routing />
                    </ProfileProvider>
                </ThemeProvider>
            </I18nextProvider>
        </Suspense>
    );
};

export default App;
