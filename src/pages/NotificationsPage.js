import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { localized } from '../localization/components';
import { NotificationsList } from '../Notification/components';
import { PrometeusDescription } from '../PrometeusDescription';
import { Layout } from '../Layout';

const _NotificationsPage = ({ l }) => (
    <Grid container>
        <Grid item xs={12}>
            <AppBar currentActiveRoute="notifications" />
        </Grid>
        <Grid item xs={12}>
            <Layout>
                <Grid container spacing={2} className="content-container">
                    <Grid item md={3} className="left-banners-container">
                        <PrometeusDescription />
                    </Grid>
                    <Grid item lg={9} xs={12} className="right-content-container">
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={9} className="right-content">
                                <NotificationsList />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item md={3} className="right-banners-container" />
                </Grid>
            </Layout>
        </Grid>
    </Grid>
);

export const NotificationsPage = localized(_NotificationsPage);
