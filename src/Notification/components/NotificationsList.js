import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';
import { Notification } from './Notification';
import { localized } from '../../localization/components';
import { BellIcon } from '../../icons/BellIcon';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    notificationsError: {
        border: '1px solid #F1EBE8',
        borderBottom: 'none',
        height: '100%'
    },
    notificationsErrorInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '65px',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: '#A2A2A2',
        '& p': {
            fontFamily: 'Museo Sans Cyrl Bold',
            fontSize: '20px',
            margin: '24px 0 4px 0',
            color: '#1C1C1C',
        }
    }
    
}));

const _NotificationsList = ({ notifications, fetchNotifications, pending, currentUser, l }) => {
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
          <div className={classes.notificationsError}>
              <div className={classes.notificationsErrorInfo}>
                  <BellIcon width={'50'} height={'50'} color={'#A1A1A1'}/>
                  <p>Nothing to display yet!</p>
                  <span>Please login or sign up to receive notifications</span>
              </div>
          </div>
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
