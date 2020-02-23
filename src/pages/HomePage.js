import React from "react";
import {inject, observer} from "mobx-react";
import {Grid, Hidden} from "@material-ui/core";
import {AppBar} from "../AppBar/components";
import {LoginForm} from "../Authorization/components";
import {Layout} from "../Layout";
import {GlobalTimeline} from "../Status/components";
import {PrometeusDescription} from "../PrometeusDescription";

const _HomePage = ({currentUser}) => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar currentActiveRoute="home"/>
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Grid container spacing={2}>
                    <Hidden mdDown>
                        <Grid item md={3}>
                            <PrometeusDescription/>
                        </Grid>
                    </Hidden>
                    <Grid item lg={9} xs={12}>
                        <Grid container spacing={2}>
                            {!currentUser && (
                                <Grid item xs={12}>
                                    <LoginForm/>
                                </Grid>
                            )}
                            <Grid item xs={12} md={9}>
                                <GlobalTimeline/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Layout>
        </Grid>
    </Grid>
);

const mapMobxToProps = ({authorization}) => ({
    currentUser: authorization.currentUser
});

export const HomePage = inject(mapMobxToProps)(observer(_HomePage));
