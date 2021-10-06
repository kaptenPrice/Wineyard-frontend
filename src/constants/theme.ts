import { Theme } from '@material-ui/core';

export default {
    typography: {
        fontFamily: 'Rubik Beastly'
    },
    overrides: {
        MuiLink: {
            root: {
                fontFamily: 'Rubik Beastly'
            },
            underlineHover: {
                '&:hover': {
                    textDecoration: 'none'
                }
            }
        }
    }
} as unknown as Theme;
