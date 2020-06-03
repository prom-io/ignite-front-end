import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { UpdateUserProfileDialog, UserProfileContainer } from '../User/components';
import { StatusBtfsInfoDialog } from '../Status/components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  containerRoot: {
    marginTop: '70px',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    }
  },
}));

export const UserProfilePage = () => (
    <Grid container>
      <AppBar currentActiveRoute="none" classes={{root:useStyles().containerRoot}}/>
        <Grid item xs={12}>
            <Layout>
                <UserProfileContainer />
                <UpdateUserProfileDialog />
            </Layout>
        </Grid>
        <StatusBtfsInfoDialog />
    </Grid>
);
