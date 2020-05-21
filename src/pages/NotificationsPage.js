import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { localized } from '../localization/components';
import { NotificationsList } from '../Notification/components';
import {PrometeusDescription} from "../PrometeusDescription";

const pageHeight = document.documentElement.clientHeight;

const _NotificationsPage = ({ l }) => (
    <div className="static-page" style={{ minHeight: pageHeight }}>
        <Grid item xs={12}>
            <AppBar currentActiveRoute="notifications" />
        </Grid>
        <Grid item xs={12}>
            <Grid container className="content-container" spacing={2}>
                <Grid item md={3} className="left-banners-container">
                    <PrometeusDescription />
                </Grid>
                <Grid item xs={12} lg={9} className="right-content-container">
                    <NotificationsList />
                </Grid>
            </Grid>
        </Grid>
    </div>
);

export const NotificationsPage = localized(_NotificationsPage);
