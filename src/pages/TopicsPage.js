import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import { observer } from "mobx-react";

import { AppBar } from "../AppBar/components";
import { TopicsPageContainer, TopicsPopular } from "../Topics/components";
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription
} from "../PrometeusDescription";
import { LoginForm } from "../Authorization/components";
import { Layout } from "../Layout";
import { useAuthorization } from "../store/hooks";

export const TopicsPage = observer(() => {
    const { currentUser } = useAuthorization();

    return (
        <Grid container>
            <AppBar currentActiveRoute="topics" />
            <Grid item xs={12}>
                <Layout>
                    <Grid container className="content-container">
                        <Grid item md={3} className="left-banners-container">
                            <PrometeusDescription />
                        </Grid>
                        <Grid
                            item
                            spacing={28}
                            lg={9}
                            className="right-content-container"
                        >
                            {!currentUser ? (
                                <Grid item className="login-form-container">
                                    <LoginForm />
                                </Grid>
                            ) : (
                                <TopicsPageContainer />
                            )}
                        </Grid>
                        <Grid item md={3} className="right-banners-container">
                            {currentUser ? (
                                <Hidden only={["md"]}>
                                    <TopicsPopular />
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
});
