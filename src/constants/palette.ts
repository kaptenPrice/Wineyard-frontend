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
        // main: '#00B9C5'
        main: '#CA2C46'
    },
    text: { primary: '#222222', secondary: '#AAAAAA' },
    secondary: {
        main: '#0B2545'
    },
    defaultSvg: {
        main: '#222222'
    },
    type: 'light',
    background: { default: '#fbddc8' }
};

export type CustomPaletteType = {
    defaultSvg: Partial<Palette['primary']>;
};
