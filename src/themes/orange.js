import { createMuiTheme } from '@material-ui/core';

export const orange = createMuiTheme({
    overrides: {
        MuiTouchRipple: {
            root: {
                background: 'rgba(255,255,255,0)',
            },
        },
        MuiIconButton: {
            root: {
                '&:hover': {
                    backgroundColor: 'rgba(255, 92, 1, 0.2)',
                },
            },
        },
        MuiListItem: {
            button: {
                '&:hover': {
                    backgroundColor: 'rgba(255, 92, 1, 0.2)',
                },
            },
        },
        MuiDialogContent: {
            root: {
                padding: '24px 64px 40px 64px',
            },
        },
        MuiButton: {
            root: {
                borderRadius: '30px',
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
        fontFamily: 'Museo Sans Cyrl Regular',
    },
});
