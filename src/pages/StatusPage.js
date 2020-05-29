import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { StatusBtfsInfoDialog, StatusPageContainer } from '../Status/components';

export const StatusPage = () => (
    <Grid container>
        <Grid item>
            <AppBar />
        </Grid>
        <Grid item>
            <Grid container spacing={2} className="content-container">
                <Grid item lg={9} className="right-content-container">
                    <StatusPageContainer />
                </Grid>
            </Grid>
        </Grid>
        <StatusBtfsInfoDialog />
    </Grid>
);
