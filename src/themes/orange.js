import { createMuiTheme } from '@material-ui/core';

export const orange = createMuiTheme({
    overrides: {
        MuiGrid: {
            root: {
                maxWidth: '100%',
                margin: 0
            },
            container: {
                maxWidth: '100%',
                margin: 0
            },
            'spacing-xs-2': {
                maxWidth: '100%',
                margin: 0
            }
        },
        MuiTouchRipple: {
            root: {
                background: 'rgba(255,255,255,0)',
            },
        },
        MuiDialog: {
            paperWidthMd: {
                maxWidth: 600,
            }
        },
        MuiDialogContent: {
            root: {
                padding: '24px 64px 40px 64px',
            },
        },
        MuiButton: {
            disableElevation: true,
            root: {
                borderRadius: '30px',
            },
            outlinedPrimary: {
                border: "1px solid #FF5C01"
            },
            contained: {
                boxShadow: 'none',
            },
            containedPrimary: {
                '&:hover': {
                    boxShadow: 'none',
                },
                '&:active': {
                    boxShadow: 'none',
                },
            }
        },
        MuiTypography:{
            root: {
                fontFamily: 'Museo Sans Cyrl Regular',
            }
        }
    },
    palette: {
        action: {
            disabledBackground: '#ffdecc',
            disabled: '#FFFFFF' ,
            hover: '#ffdecc',
        },
        common: {
            black: '#000',
            white: '#fff',
        },
        background: {
            paper: '#fff',
            default: '#fafafa',
            light: '#FFFBF8',
        },
        primary: {
            light: '#ff9c00',
            main: '#FF5C01',
            dark: '#EF5600',
            contrastText: '#fff',
        },
        secondary: {
            light: 'rgba(94, 146, 243, 1)',
            main: 'rgba(21, 101, 192, 1)',
            dark: 'rgba(0, 60, 143, 1)',
            contrastText: '#fff',
            status: '#6483C0',
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
        },
        text: {
            main: '#1C1C1C',
            secondary: '#A2A2A2',
            primary: 'rgba(0, 0, 0, 0.87)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
        border: {
            main: '#F1EBE8',
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        body2: {
            fontWeight: 600,
            fontSize: '14px',
        },
        fontFamily: 'Museo Sans Cyrl Regular',
    },
});
