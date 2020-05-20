import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { HeartOutlinedIcon } from '../../icons/HeartOutlinedIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    cardContentRoot: {
        paddingLeft: theme.spacing(6) + 2,
    },
}));

const _StatusLikeNotification = ({ notification, l }) => {
    const classes = useStyles();
    const user = notification.payload.liked_by;
    const status = notification.payload.liked_status;

    return (
        <Card
            elevation={0}
            className="statusCardBox"
        >
            <NotificationTitle
                user={user}
                actionLabel={l('notification.like')}
                icon={<HeartOutlinedIcon />}
            />
            <CardContent
                classes={{
                    root: classes.cardContentRoot,
                }}
            >
                <RepostedStatusContent repostedStatus={status} />
            </CardContent>
        </Card>
    );
};

export const StatusLikeNotification = localized(_StatusLikeNotification);
