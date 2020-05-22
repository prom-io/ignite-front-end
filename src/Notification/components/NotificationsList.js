import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';
import { Notification } from './Notification';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
}));

const _NotificationsList = ({ notifications, fetchNotifications, pending, currentUser, l }) => {
    const classes = useStyles();

    const trackScrolling = () => {
        const element = document.getElementById('notificationsList');

        if (element.getBoundingClientRect().bottom < window.innerHeight) {
            fetchNotifications();
        }
    };

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);

        return () => document.removeEventListener('scroll', trackScrolling);
    });

    if (!currentUser) {
        return (
            <Typography>
                {l('notifications.login-required')}
            </Typography>
        );
    }

    return (
        <div id="notificationsList" className="paddingBottomRoot">
            {notifications.map(notification => (
                <Notification
                    notification={notification}
                    key={notification.id}
                />
            ))}
            {pending && (
                <CircularProgress
                    size={25}
                    color="primary"
                    className={classes.centered}
                />
            )}
        </div>
    );
};

const mapMobxToProps = ({ notifications, authorization }) => ({
    notifications: notifications.notifications,
    fetchNotifications: notifications.fetchNotifications,
    currentUser: authorization.currentUser,
});

export const NotificationsList = localized(
    inject(mapMobxToProps)(observer(_NotificationsList)),
);
