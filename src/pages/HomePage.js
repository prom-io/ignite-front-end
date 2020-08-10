import React from 'react';
import { inject, observer } from 'mobx-react';
import { Grid, Hidden } from '@material-ui/core';

import { TopicsPopular } from '../Topics/components';
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
import { WhoToFollow } from '../Follow/components';
import '../styles/App.sass';

const _HomePage = ({ currentUser, homepageTimeline }) => (
    <Grid container>
        <AppBar currentActiveRoute="home" />
        <Grid item xs={12}>
            <Layout>
                <Grid container className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <PrometeusDescription />
                    </Grid>
                    <Grid item lg={9} className="right-content-container">
                        <Grid container>
                            {!currentUser && (
                                <Grid item xs={12} className="login-form-container">
                                    <LoginForm hideSignUpButton={process.env.REACT_APP_HIDE_SIGN_UP_BUTTON === 'true'} />
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
                                <TopicsPopular isNotFull />
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
    </Grid>
);

const mapMobxToProps = ({ authorization, timelineSwitcher }) => ({
    currentUser: authorization.currentUser,
    homepageTimeline: timelineSwitcher.currentTimeline,
});

export const HomePage = inject(mapMobxToProps)(observer(_HomePage));
