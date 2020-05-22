import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { ReplyOutlinedIcon } from '../../icons/ReplyOutlinedIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    cardContentRoot: {
        paddingLeft: theme.spacing(6) + 2,
    },
}));

const _StatusReplyNotification = ({ notification, l }) => {
    const classes = useStyles();

    const status = notification.payload;
    const user = status.account;

    return (
        <Card
            elevation={0}
            className="notificationCardBox"
        >
            <NotificationTitle
                user={user}
                actionLabel={l('notification.reply')}
                icon={<ReplyOutlinedIcon />}
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

export const StatusReplyNotification = localized(_StatusReplyNotification);
