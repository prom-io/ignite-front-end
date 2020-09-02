import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { UserProfileContainer } from '../User/components';
import { StatusBtfsInfoDialog } from '../Status/components';
import { MemezatorDialog } from '../Memezator/components';

export const UserProfilePage = () => (
    <Grid container>
        <AppBar currentActiveRoute="none" />
        <Grid item xs={12}>
            <Layout>
                <UserProfileContainer />
            </Layout>
        </Grid>
        <StatusBtfsInfoDialog />
        <MemezatorDialog />
    </Grid>
);
