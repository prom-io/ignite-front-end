import { createMuiTheme } from '@material-ui/core';

export const orange = createMuiTheme({
    overrides: {
        MuiDialogTitle: {
            root: {
                background: '#FFFBF8',
            }
        },
        MuiButton: {
            root: {
                borderRadius: '30px',
            }
        },
        MuiDialogContent: {
            root: {
                padding: 0,
                margin: '24px 62px',
            }
        },
        MuiDialog: {
            paperWidthSm: {
                maxWidth: '648px',
            }
        },
        MuiInputBase: {
            input: {
                color: '#A2A2A2',
            },
        },
    },
    palette: {
        common: {
            black: '#000',
            white: '#fff',
        },
        background: {
            paper: '#fff',
            default: '#fafafa',
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
        },
        error: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#fff',
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
        },
    },
    typography: {
        button: {
            textTransform: 'none',
        },
        fontFamily: 'Museo Sans Cyrl Regular',
    },
});
