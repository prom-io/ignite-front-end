import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { UserProfileContainer } from '../User/components';
import { StatusBtfsInfoDialog } from '../Status/components';
import { makeStyles } from '@material-ui/core/styles';

export const UserProfilePage = () => (
    <Grid container>
      <AppBar currentActiveRoute="none"/>
        <Grid item xs={12}>
            <Layout>
                <UserProfileContainer />
            </Layout>
        </Grid>
        <StatusBtfsInfoDialog />
    </Grid>
);
