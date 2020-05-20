import React from 'react';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { localized } from '../../localization/components';
import { ReplyOutlinedIcon } from '../../icons/ReplyOutlinedIcon';

const useStyles = makeStyles(theme => ({
    cardContentRoot: {
        paddingLeft: theme.spacing(6) + 2,
    },
    newStatusNotification: {
        marginBottom: 0,
    },
}));

const _NewStatusNotifications = ({ notification, l }) => {
    const classes = useStyles();

    const status = notification.payload;
    const user = status.account;

    return (
        <Card className={classes.statusLikeNotification}>
            <NotificationTitle
                user={user}
                actionLabel={l('notification.new-post')}
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

export const NewStatisNotification = localized(_NewStatusNotifications);
