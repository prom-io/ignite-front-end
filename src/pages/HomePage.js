import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Hidden } from '@material-ui/core';

import { AppBar } from '../AppBar/components';
import { LoginForm } from '../Authorization/components';
import { Layout } from '../Layout';
import {
    GlobalTimeline,
    HomeTimeline,
    StatusBtfsInfoDialog,
} from '../Status/components';
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription,
} from '../PrometeusDescription';
import { WhoToFollow, FollowDialog } from '../Follow/components';
import '../styles/App.sass';

const _HomePage = ({ currentUser, homepageTimeline }) => (
    <Grid container>
        <Grid item>
            <AppBar currentActiveRoute="home" />
        </Grid>
        <Grid item style={{ width: '100%' }}>
            <Layout>
                <Grid container className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <PrometeusDescription />
                    </Grid>
                    <Grid item spacing={28} lg={9} className="right-content-container">
                        <Grid container spacing={2}>
                            {!currentUser && (
                                <Grid item className="login-form-container">
                                    <LoginForm />
                                </Grid>
                            )}
                            <Grid item xs={12} md={9} className="right-content">
                                {homepageTimeline === 'home' ? (
                                    <HomeTimeline />
                                ) : (
                                    <GlobalTimeline />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="right-banners-container">
                        {currentUser ? (
                            <Hidden only={['md']}>
                                <WhoToFollow />
                            </Hidden>
                        ) : (
                            <ExploreOurFeaturesDescription />
                        )}
                    </Grid>
                </Grid>
            </Layout>
        </Grid>
        <StatusBtfsInfoDialog />
        <FollowDialog />
    </Grid>
);

const mapMobxToProps = ({ authorization, timelineSwitcher }) => ({
    currentUser: authorization.currentUser,
    homepageTimeline: timelineSwitcher.currentTimeline,
});

export const HomePage = inject(mapMobxToProps)(observer(_HomePage));
