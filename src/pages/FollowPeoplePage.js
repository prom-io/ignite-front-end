import React from 'react';
import { Grid } from '@material-ui/core';

import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { UserCard } from '../components/UserCard';
import { FollowPeopleContainer } from '../Follow/components';
import '../styles/App.sass';
import { makeStyles } from '@material-ui/core/styles';

export const FollowPeoplePage = () => (
    <Grid container>
        <AppBar />
        <Grid item xs={12} >
            <Layout>
                <Grid container spacing={2} className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <UserCard isLogin />
                    </Grid>
                    <Grid item lg={9} xs={12} className="right-content-container">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={9} className="right-content">
                                <FollowPeopleContainer />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="right-banners-container" />
                </Grid>
            </Layout>
        </Grid>
    </Grid>
);
