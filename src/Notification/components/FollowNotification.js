import React from 'react';
import {Card} from '@material-ui/core';
import {NotificationTitle} from './NotificationTitle';
import {localized} from '../../localization/components';
import {FollowerIcon} from '../../icons/FollowerIcon';

const _FollowNotification = ({ notification, l }) => (
    <Card
        elevation={0}
        className="statusCardBox"
    >
        <NotificationTitle
            user={notification.payload}
            actionLabel={l('notification.follow')}
            icon={<FollowerIcon />}
        />
    </Card>
);;

export const FollowNotification = localized(_FollowNotification);
