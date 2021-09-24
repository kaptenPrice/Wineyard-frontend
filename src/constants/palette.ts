import { Palette, PaletteOptions } from '@material-ui/core/styles/createPalette';

export const darkPalette: PaletteOptions & CustomPaletteType = {
    // primary: {
    //     main: '#00ABE7'
    // },
    // secondary: {
    //     main: '#F26DF9'
    // },
    defaultSvg: {
        main: '#dbdbdb'
    },
    type: 'dark',
    background: { default: '#05162c', paper: '#0B2545' }
};

export const lightPalette: PaletteOptions & CustomPaletteType = {
    primary: {
        main: '#00B9C5'
    },
    secondary: {
        main: '#0B2545'
    },
    defaultSvg: {
        main: '#dbdbdb'
    },
    type: 'light',
    background: { default: '#e4e4e4' }
};

export type CustomPaletteType = {
    defaultSvg: Partial<Palette['primary']>;
};
