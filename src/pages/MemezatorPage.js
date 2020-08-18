import React from "react";
import { inject, observer } from "mobx-react";
import { Grid, Hidden } from "@material-ui/core";

import { Layout } from "../Layout";
import { AppBar } from "../AppBar/components";
import {
    MemezatorHeader,
    MemezatorTimeline,
    MemezatorWinners
} from "../Memezator/components";
import { LoginForm } from "../Authorization/components";
import { PrometeusDescription } from "../PrometeusDescription";

const _MemezatorPage = ({ currentUser }) => (
    <Grid container>
        <Grid item>
            <AppBar currentActiveRoute="memezator" />
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
                            <MemezatorHeader />
                            <Grid item xs={12} md={9} className="right-content">
                                <MemezatorTimeline />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="right-banners-container">
                        <Hidden only={["md"]}>
                            <MemezatorWinners />
                        </Hidden>
                    </Grid>
                </Grid>
            </Layout>
        </Grid>
    </Grid>
);

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser
});

export const MemezatorPage = inject(mapMobxToProps)(observer(_MemezatorPage));
