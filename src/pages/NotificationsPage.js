import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import Hidden from '@material-ui/core/Hidden';
import { AppBar } from '../AppBar/components';
import { NotificationsList } from '../Notification/components';
import {
    PrometeusDescription,
    ExploreOurFeaturesDescription,
} from '../PrometeusDescription';
import { Layout } from '../Layout';
import { LoginForm } from '../Authorization/components';
import { useAuthorization, useLocalization } from '../store/hooks';
import { BackButton } from '../components/BackButton';

const useStyles = makeStyles(theme => ({
    notificationsTitle: {
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '24px',
        marginBottom: '24px',
    },
}));

export const NotificationsPage = observer(() => {
    const classes = useStyles();
    const { currentUser } = useAuthorization();
    const { l } = useLocalization();

    return (
        <Grid container>
            <AppBar currentActiveRoute="notifications" />
            <Grid item xs={12}>
                <Layout>
                    <Grid container className="content-container">
                        <Grid item md={3} className="left-banners-container">
                            <PrometeusDescription />
                        </Grid>
                        <Grid
                            item
                            lg={9}
                            className="right-content-container"
                        >
                            {!currentUser ? (
                                <Grid item className="login-form-container">
                                    <LoginForm hideSignUpButton={process.env.REACT_APP_HIDE_SIGN_UP_BUTTON === 'true'} />
                                </Grid>
                            ) : (
                                <Hidden smDown>
                                    <BackButton title="appbar.notifications" toHome />
                                </Hidden>
                            )}
                            <NotificationsList />
                        </Grid>
                        <Grid item md={3} className="right-banners-container">
                            <ExploreOurFeaturesDescription />
                        </Grid>
                    </Grid>
                </Layout>
            </Grid>
        </Grid>
    );
});
