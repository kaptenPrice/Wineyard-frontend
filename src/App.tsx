import React, { Suspense, useEffect } from 'react';
import Routing from './routes/Routing';
import ProfileProvider from './provider/ProfileProvider';
import ThemeProvider from './provider/ThemeProvider';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import SocketProvider from './provider/SocketProvider';

const App = () => {
   
 
    return (
        <Suspense fallback={<h1 style={{ color: 'black' }}>...loading</h1>}>
            <I18nextProvider i18n={i18n}>
                <ThemeProvider>
                    <ProfileProvider>
                        <SocketProvider>
                            <Routing />
                        </SocketProvider>
                    </ProfileProvider>
                </ThemeProvider>
            </I18nextProvider>
        </Suspense>
    );
};

export default App;
