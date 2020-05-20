import React from 'react';
import { Card, makeStyles } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { localized } from '../../localization/components';
import { FollowerIcon } from '../../icons/FollowerIcon';

const useStyles = makeStyles(() => ({
    followNotification: {
        marginBottom: 0,
    },
}));

const _FollowNotification = ({ notification, l }) => {
    const classes = useStyles();

    return (
        <Card className={classes.followNotification}>
            <NotificationTitle
                user={notification.payload}
                actionLabel={l('notification.follow')}
                icon={<FollowerIcon />}
            />
        </Card>
    );
};

export const FollowNotification = localized(_FollowNotification);
