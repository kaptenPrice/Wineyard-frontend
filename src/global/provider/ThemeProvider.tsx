import { createTheme } from '@material-ui/core';
import React, { useContext, PropsWithChildren } from 'react';
import { createContext } from 'react';
import theme from '../../constants/theme';
import { darkPalette, lightPalette } from '../../constants/palette';

import { ThemeProvider as OrgProvider } from '@material-ui/core';
import { useState } from 'react';

export const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }: PropsWithChildren<any>) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <OrgProvider
                theme={createTheme({ ...theme, palette: isDarkMode ? darkPalette : lightPalette })}
            >
                {children}
            </OrgProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
export const useThemeProvider = () => useContext(ThemeContext);
