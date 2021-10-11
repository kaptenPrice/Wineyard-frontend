import { Theme } from '@material-ui/core';

export default {
    typography: {
        fontFamily: 'Ubuntu'
    },
    overrides: {
        MuiLink: {
            root: {
                fontFamily: 'Ubuntu',
                fontSize: 24,
                fontWeight:"bold"
            },
            underlineHover: {
                '&:hover': {
                    textDecoration: 'none'
                }
            }
        }
    }
} as unknown as Theme;
