import React, { Suspense } from 'react';
import Routing from './routes/Routes';
import ProfileProvider from './provider/ProfileProvider';
import ThemeProvider from './provider/ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import SocketProvider from './provider/SocketProvider';
import Snackbar from './components/Snackbar';
import WineProvider from './provider/WineProvider';

const App = () => {
    return (
        <Suspense fallback={<h1 style={{ color: 'black' }}>...loading</h1>}>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <Snackbar>
                        <ProfileProvider>
                            <SocketProvider>
                                <WineProvider>
                                <Routing />
                                </WineProvider>
                            </SocketProvider>
                        </ProfileProvider>
                    </Snackbar>
                </ThemeProvider>
            </I18nextProvider>
        </Suspense>
    );
};

export default App;
