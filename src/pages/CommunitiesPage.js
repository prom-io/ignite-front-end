import React from "react";
import { inject, observer } from "mobx-react";
import { Grid, Hidden } from "@material-ui/core";

import { Layout } from "../Layout";
import { AppBar } from "../AppBar/components";
import { CommunitiesContainer } from "../Community/components";
import { LoginForm } from "../Authorization/components";
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription
} from "../PrometeusDescription";
import { TopicsPopular } from "../Topics/components";
import { WhoToFollow } from "../Follow/components";

const _CommunitiesPage = ({ currentUser }) => (
    <Grid container>
        <Grid item>
            <AppBar currentActiveRoute="communities" />
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Grid container className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <PrometeusDescription />
                    </Grid>
                    <Grid item xs={12} lg={9} className="right-content-container">
                        <Grid container>
                            {!currentUser && (
                                <Grid
                                    item
                                    xs={12}
                                    className="login-form-container"
                                    style={{ marginBottom: "16px" }}
                                >
                                    <LoginForm
                                        hideSignUpButton={
                                            process.env
                                                .REACT_APP_HIDE_SIGN_UP_BUTTON ===
                                            "true"
                                        }
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12} md={9} className="right-content">
                                <CommunitiesContainer />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="right-banners-container">
                        {currentUser ? (
                            <Hidden only={["md"]}>
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
    </Grid>
);

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser
});

export const CommunitiesPage = inject(mapMobxToProps)(observer(_CommunitiesPage));
