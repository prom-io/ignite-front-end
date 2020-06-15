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
import { useAuthorization, useStore } from '../store/hooks';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    mobileTopicsPopular: {
        position: "fixed",
        display: 'flex',
        background: theme.palette.background.paper,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        overflowY: 'scroll',
    }
}));

export const TopicsPage = observer(() => {
    const { currentUser } = useAuthorization();
    const { isTopicsMenuOpen } = useStore().topicsPopular;
    const classes = useStyles();
    
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
                        <Grid item md={3} className={`right-banners-container ${isTopicsMenuOpen && classes.mobileTopicsPopular}`}>
                            {currentUser ? (
                                <Hidden>
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
