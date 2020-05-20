import React from 'react';
import { StatusLikeNotification } from './StatusLikeNotification';
import { StatusReplyNotification } from './StatusReplyNotification';

export const Notification = ({ notification }) => {
    switch (notification.type) {
    case 'STATUS_LIKE':
        return <StatusLikeNotification notification={notification} />;
    case 'STATUS_REPLY':
        return <StatusReplyNotification notification={notification} />;
    default:
        return null;
    }
};
