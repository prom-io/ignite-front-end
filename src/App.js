import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { MobxRouter } from 'mobx-router';
import './styles/App.sass';
import "emoji-mart/css/emoji-mart.css";
import { orange } from './themes/orange';

export const App = () => (
    <SnackbarProvider maxSnack={3}>
        <MuiThemeProvider theme={orange}>
            <MobxRouter />
        </MuiThemeProvider>
    </SnackbarProvider>
);
