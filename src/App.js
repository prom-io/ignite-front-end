import React from "react";
import { MobxRouter } from "mobx-router";
import { MuiThemeProvider } from "@material-ui/core";
import "./styles/App.scss";
import { orange } from "./themes/orange";

export const App = () => (
    <MuiThemeProvider theme={orange}>
        <MobxRouter />
    </MuiThemeProvider>
);
