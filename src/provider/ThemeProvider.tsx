import React, { useContext, PropsWithChildren, useEffect } from 'react';
import { createContext } from 'react';
import theme from '../constants/theme';
import { CustomPaletteType, darkPalette, lightPalette } from '../constants/palette';
import { ThemeProvider as OrgProvider, createTheme } from '@material-ui/core';
import { useState } from 'react';
import "@fontsource/rubik-beastly";

export const ThemeContext = createContext(undefined);

const ThemeProvider = ({ children }: PropsWithChildren<any>) => {
    const [isDarkMode, setIsDarkMode] = useState(localStorage.isDarkMode === 'true' || false);

    useEffect(() => {
        localStorage.setItem('isDarkMode', isDarkMode.toString());
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
            <OrgProvider theme={createTheme({ ...theme, palette: isDarkMode ? darkPalette : lightPalette })}>
                {children}
            </OrgProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

export const useThemeProvider = () => useContext(ThemeContext);

declare module '@material-ui/core/styles/createPalette' {
    interface Palette extends CustomPaletteType {}
    interface PaletteOptions extends CustomPaletteType {}
}
