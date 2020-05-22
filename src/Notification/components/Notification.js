import React from 'react';
import { StatusLikeNotification } from './StatusLikeNotification';
import { StatusReplyNotification } from './StatusReplyNotification';
import { NewStatisNotification } from './NewStatusNotification';
import { FollowNotification } from './FollowNotification';

export const Notification = ({ notification }) => {
    switch (notification.type) {
    case 'STATUS_LIKE':
        return <StatusLikeNotification notification={notification} />;
    case 'STATUS_REPLY':
        return <StatusReplyNotification notification={notification} />;
    case 'NEW_STATUS':
        return <NewStatisNotification notification={notification} />;
    case 'FOLLOW':
        return <FollowNotification notification={notification} />;
    default:
        return null;
    }
};