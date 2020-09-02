import React from 'react';
import { Card, CardContent, makeStyles, useMediaQuery, useTheme, Hidden } from '@material-ui/core';

import { NotificationTitle } from './NotificationTitle';
import { NotificationLeftMargin } from './NotificationLeftMargin';
import { RepostedStatusContent } from '../../Status/components';
import { localized } from '../../localization/components';
import { HeartOrangeIcon } from '../../icons/HeartOrangeIcon';

const useStyles = makeStyles(() => ({
    cardContentRoot: {
        display: 'flex',
        padding: '0px !important',
    },
}));

const _StatusLikeNotification = ({ notification, l, dateFnsLocale }) => {
    const theme = useTheme();
    const classes = useStyles();
    const user = notification.payload.liked_by;
    const status = notification.payload.liked_status;
    const disableLeftPadding = useMediaQuery(theme.breakpoints.down('md')) && status.status_reference_type === 'REPOST';

    return (
        <Card
            elevation={0}
            className="notificationCardBox"
        >
            <NotificationTitle
                user={user}
                actionLabel={l('notification.like')}
                icon={<HeartOrangeIcon />}
                createdAt={notification.created_at}
                dateFnsLocale={dateFnsLocale}
            />
            <CardContent
                classes={{
                    root: classes.cardContentRoot,
                }}
            >
                <Hidden xsDown>
                    <NotificationLeftMargin />
                </Hidden>
                <RepostedStatusContent
                    repostedStatus={status}
                    disableLeftPadding={disableLeftPadding}
                    hideBorders
                />
            </CardContent>
        </Card>
    );
};

export const StatusLikeNotification = localized(_StatusLikeNotification);
