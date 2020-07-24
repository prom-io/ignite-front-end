import React from 'react';
import { Grid, Hidden } from '@material-ui/core';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '../AppBar/components';
import { TopicsPageContainer, TopicsPopular } from '../Topics/components';
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription,
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
        height: "calc(100% - 50px)",
        zIndex: 1150,
        overflowY: 'scroll',
    },
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
                            {!currentUser
                            && (
                                <Grid item className="login-form-container">
                                    <LoginForm hideSignUpButton={process.env.REACT_APP_HIDE_SIGN_UP_BUTTON === 'true'} />
                                </Grid>
                            )}
                            <TopicsPageContainer currentUser={currentUser} />
                        </Grid>
                        <Grid item md={3} className={`right-banners-container ${isTopicsMenuOpen && classes.mobileTopicsPopular}`}>
                            <Hidden>
                                <TopicsPopular />
                            </Hidden>
                        </Grid>
                    </Grid>
                </Layout>
            </Grid>
        </Grid>
    );
});
