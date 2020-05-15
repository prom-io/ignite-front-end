import React from 'react';
import { Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { StaticPageFooter } from '../components/StaticPageFooter';
import { localized } from '../localization/components';

const pageHeight = document.documentElement.clientHeight;

const _NotificationsPage = ({ l }) => (
    <div className="static-page" style={{ minHeight: pageHeight }}>
        <Grid item xs={12}>
            <AppBar currentActiveRoute="notifications" />
        </Grid>
        <div className="static-page-container">
            <div className="static-page-logo-container">
                <img src="/page_img/notifications_page.png" />
                <h1>{l('appbar.notifications')}</h1>
            </div>
            <div>
                <div>
                    <p>
                        {l('notifications.description.first-paragraph')}
                    </p>
                    <p>
                        {l('notifications.description.second-paragraph')}
                    </p>
                    <p>
                        {l('notifications.description.third-paragraph')}
                    </p>
                </div>
            </div>
        </div>
        <StaticPageFooter />
    </div>
);

export const NotificationsPage = localized(_NotificationsPage);
