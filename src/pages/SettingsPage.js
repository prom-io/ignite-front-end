import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { SettingsCard } from '../Settings/components';

export const SettingsPage = () => (
    <Grid container>
        <Grid item>
            <AppBar />
        </Grid>
        <Grid item>
            <Layout>
                <Grid container spacing={2} className="content-container">
                    <Grid item md={3} />
                    <Grid item md={9} className="right-content-container">
                        <SettingsCard />
                    </Grid>
                    <Grid item md={3} className="left-container" />
                </Grid>
            </Layout>
        </Grid>
    </Grid>
);
