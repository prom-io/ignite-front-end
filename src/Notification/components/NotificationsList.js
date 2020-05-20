import React from 'react';
import { inject, observer } from 'mobx-react';
import { Notification } from './Notification';

const _NotificationsList = ({ notifications, pending }) => (
    <div>
        {notifications.map(notification => (
            <Notification
                notification={notification}
                key={notification.id}
            />
        ))}
    </div>
);

const mapMobxToProps = ({ notifications }) => ({
    notifications: notifications.notifications,
});

export const NotificationsList = inject(mapMobxToProps)(observer(_NotificationsList));
