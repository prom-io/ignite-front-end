import React from "react";
import {inject, observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {LoginForm} from "../Authorization/components";
import {Layout} from "../Layout";
import {GlobalTimeline, HomeTimeline, StatusBtfsInfoDialog} from "../Status/components";
import {PrometeusDescription} from "../PrometeusDescription";
import '../styles/App.sass'

const _HomePage = ({currentUser, homepageTimeline}) => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar currentActiveRoute="home" />
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Grid container spacing={2} className="content-container">
                    <Grid item md={3} className="left-container">
                        <PrometeusDescription/>
                    </Grid>
                    <Grid item lg={9} xs={12} className="right-content-container">
                        <Grid container spacing={2}>
                            {!currentUser && (
                                <Grid item xs={12}  className="login-form-container">
                                    <LoginForm/>
                                </Grid>
                            )}
                            <Grid item xs={12} md={9} className="right-content">
                                {homepageTimeline === "home" ? <HomeTimeline/> : <GlobalTimeline/>}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="left-container">
                    </Grid>
                </Grid>
            </Layout>
        </Grid>
        <StatusBtfsInfoDialog/>
    </Grid>
);

const mapMobxToProps = ({authorization, timelineSwitcher}) => ({
    currentUser: authorization.currentUser,
    homepageTimeline: timelineSwitcher.currentTimeline
});

export const HomePage = inject(mapMobxToProps)(observer(_HomePage));
