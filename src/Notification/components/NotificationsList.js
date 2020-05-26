import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification } from './Notification';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
}));

const _NotificationsList = ({ notifications, fetchNotifications, currentUser, hasMore, l }) => {
    const classes = useStyles();

    const trackScrolling = () => {
        const element = document.getElementById('notificationsList');

        if (element && element.getBoundingClientRect().bottom <= window.innerHeight) {
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
            <InfiniteScroll
                next={fetchNotifications}
                hasMore={hasMore}
                loader={(
                    <CircularProgress
                        size={25}
                        color="primary"
                        className={classes.centered}
                    />
                )}
                dataLength={notifications.length}
                style={{ overflowY: 'hidden' }}
            >
                {notifications.map(notification => (
                    <Notification
                        notification={notification}
                        key={notification.id}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};

const mapMobxToProps = ({ notifications, authorization }) => ({
    notifications: notifications.notifications,
    fetchNotifications: notifications.fetchNotifications,
    currentUser: authorization.currentUser,
    hasMore: notifications.hasMore,
});

export const NotificationsList = localized(
    inject(mapMobxToProps)(observer(_NotificationsList)),
);
