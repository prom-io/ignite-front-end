import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { localized } from '../localization/components';
import { NotificationsList } from '../Notification/components';
import { ExploreOurFeaturesDescription, PrometeusDescription } from '../PrometeusDescription';
import { Layout } from '../Layout';
import { LoginForm } from '../Authorization/components';


const _NotificationsPage = ({ currentUser, l }) => (
    <div className="static-page">
        <Grid item >
            <AppBar currentActiveRoute="notifications" />
        </Grid>
        <Grid item >
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
    </div>
);

export const NotificationsPage = localized(_NotificationsPage);
