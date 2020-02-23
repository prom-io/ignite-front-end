import React from "react";
import {MuiThemeProvider} from "@material-ui/core";
import {MobxRouter} from "mobx-router";
import {orange} from "./themes/orange";

export const App = () => (
    <MuiThemeProvider theme={orange}>
        <MobxRouter/>
    </MuiThemeProvider>
);
