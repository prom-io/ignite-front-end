import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Notification } from './Notification';

const _NotificationsList = ({ notifications, fetchNotifications, pending }) => {
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

    return (
        <div id="notificationsList">
            {notifications.map(notification => (
                <Notification
                    notification={notification}
                    key={notification.id}
                />
            ))}
        </div>
    );
};

const mapMobxToProps = ({ notifications }) => ({
    notifications: notifications.notifications,
    fetchNotifications: notifications.fetchNotifications,
});

export const NotificationsList = inject(mapMobxToProps)(observer(_NotificationsList));
