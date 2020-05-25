import React from 'react';
import { Card } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { localized } from '../../localization/components';
import { FollowOrangeIcon } from '../../icons/FollowOrangeIcon';

const _FollowNotification = ({ notification, l, dateFnsLocale }) => (
    <Card
        elevation={0}
        className="notificationCardBox"
    >
        <NotificationTitle
            user={notification.payload}
            actionLabel={l('notification.follow')}
            icon={<FollowOrangeIcon />}
            createdAt={notification.created_at}
            dateFnsLocale={dateFnsLocale}
        />
    </Card>
);

export const FollowNotification = localized(_FollowNotification);
