import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import { observer } from "mobx-react";

import { AppBar } from "../AppBar/components";
import { TopicPageContainer, TopicsPopular } from "../Topics/components";
import {
    ExploreOurFeaturesDescription,
    PrometeusDescription
} from "../PrometeusDescription";
import { Layout } from "../Layout";
import { useAuthorization } from "../store/hooks";

export const TopicPage = observer(() => {
    const { currentUser } = useAuthorization();

    return (
        <Grid container>
            <Grid item xs={12}>
                <AppBar />
            </Grid>
            <Grid item xs={12}>
                <Layout>
                    <Grid container className="content-container">
                        <Grid item md={3} className="left-banners-container">
                            <PrometeusDescription />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            lg={9}
                            className="right-content-container"
                        >
                            {/* <TopicPageContainer /> */}
                            Topic
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
