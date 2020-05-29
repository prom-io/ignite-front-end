import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { UpdateUserProfileDialog, UserProfileContainer } from '../User/components';
import { StatusBtfsInfoDialog } from '../Status/components';

export const UserProfilePage = () => (
    <Grid container>
        <Grid item>
            <AppBar currentActiveRoute="none" />
        </Grid>
        <Grid item>
            <Layout>
                <UserProfileContainer />
                <UpdateUserProfileDialog />
            </Layout>
        </Grid>
        <StatusBtfsInfoDialog />
    </Grid>
);
