import React from "react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {StatusPageContainer} from "../Status/components";

export const StatusPage = () => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar/>
        </Grid>
        <Grid item xs={12}>
            <Grid container className="content-container" spacing={2}>
                <Grid item xs={12} lg={9} className="right-content-container">
                    <StatusPageContainer/>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);
