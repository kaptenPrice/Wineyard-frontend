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
    link: { main: '##CA2C46' },
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
    text: { primary: '#5E5E5E', secondary: '#AAAAAA',disabled:"#ff0"  },
    link: { main: '#CA2C46' },
    defaultSvg: {
        main: '#999999'
    },
    type: 'light'
};

export type CustomPaletteType = {
    defaultSvg: Partial<Palette['primary']>;
    link: Partial<Palette['primary']>;
};
