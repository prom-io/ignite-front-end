import React from 'react';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { AppBar } from '../AppBar/components';
import { localized } from '../localization/components';
import { NotificationsList } from '../Notification/components';
import { PrometeusDescription, ExploreOurFeaturesDescription } from '../PrometeusDescription';
import { Layout } from '../Layout';
import { LoginForm } from '../Authorization/components';
import { useAuthorization } from '../store/hooks';

export const NotificationsPage = observer(() => {
    const { currentUser } = useAuthorization();

    return (
       <Grid container>
        <Grid item xs={12}>
            <AppBar currentActiveRoute="notifications" />
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Grid container className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <PrometeusDescription />
                    </Grid>
                    <Grid item spacing={28} lg={9}  className="right-content-container">
                        {!currentUser && (
                          <Grid item  className="login-form-container">
                              <LoginForm />
                          </Grid>
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
