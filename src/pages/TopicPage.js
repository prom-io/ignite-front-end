import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '../AppBar/components';
import { TopicPageContainer, TopicsPopular } from '../Topics/components';
import {
    ExploreOurFeaturesDescription,
    PrometeusDescription,
} from '../PrometeusDescription';
import { LoginForm } from '../Authorization/components';
import { Layout } from '../Layout';
import { useAuthorization, useStore } from '../store/hooks';

const useStyles = makeStyles(theme => ({
    mobileTopicsPopular: {
        position: 'fixed',
        display: 'flex',
        background: theme.palette.background.paper,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 1150,
        overflowY: 'scroll',
    },
}));

export const TopicPage = observer(() => {
    const { currentUser } = useAuthorization();
    const { isTopicsMenuOpen } = useStore().topicsPopular;
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <AppBar currentActiveRoute="topics" />
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
                            {!currentUser ? (
                                <>
                                    <Grid item className="login-form-container">
                                        <LoginForm hideSignUpButton={process.env.REACT_APP_HIDE_SIGN_UP_BUTTON === 'true'} />
                                    </Grid>
                                    <TopicPageContainer currentUser={currentUser} />
                                </>
                            ) : (
                                <TopicPageContainer currentUser={currentUser} />
                            )}
                        </Grid>
                        <Grid item md={3} className={`right-banners-container ${isTopicsMenuOpen && classes.mobileTopicsPopular}`}>
                            <Hidden only={['md']}>
                                <TopicsPopular />
                            </Hidden>
                        </Grid>
                    </Grid>
                </Layout>
            </Grid>
        </Grid>
    );
});
