import { Palette, PaletteOptions } from '@material-ui/core/styles/createPalette';

export const darkPalette: PaletteOptions & CustomPaletteType = {
    background: { default: '#140000', paper: '#433333' },

    primary: {
        main: '#393232'
    },
    secondary: {
        main: '#433333'
    },

    text: { primary: '#999999', secondary: '#8d1e31' },
    defaultSvg: {
        main: '#999999'
    },
    type: 'dark'
};

export const lightPalette: PaletteOptions & CustomPaletteType = {
    background: { default: '#fbddc8' },

    primary: {
        main: '#CA2C46'
    },
    secondary: {
        main: '#0B2545'
    },
    text: { primary: '#424242', secondary: '#AAAAAA' },

    defaultSvg: {
        main: '#222222'
    },
    type: 'light'
};

export type CustomPaletteType = {
    defaultSvg: Partial<Palette['primary']>;
};
