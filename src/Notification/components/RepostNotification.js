import React from 'react';
import { Card, CardContent, makeStyles, useMediaQuery, useTheme, Hidden } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { NotificationLeftMargin } from './NotificationLeftMargin';
import { RepostedStatusContent } from '../../Status/components';
import { ReplyOrangeIcon } from '../../icons/ReplyOrangeIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    cardContentRoot: {
        display: 'flex',
        padding: '0px !important',
    },
}));

const _RepostNotification = ({ notification, l, dateFnsLocale }) => {
    const classes = useStyles();
    const theme = useTheme();
    const status = notification.payload;
    const user = status.account;
    const disableLeftPadding = useMediaQuery(theme.breakpoints.down('md')) && status.status_reference_type === 'REPOST';

    return (
        <Card
            elevation={0}
            className="notificationCardBox"
        >
            <NotificationTitle
                user={user}
                actionLabel={l('notification.repost')}
                icon={<ReplyOrangeIcon />}
                createdAt={notification.created_at}
                dateFnsLocale={dateFnsLocale}
            />
            <CardContent
                classes={{
                    root: classes.cardContentRoot,
                }}
            >
                <Hidden xsDown>
                    <NotificationLeftMargin/>
                </Hidden>
                <RepostedStatusContent
                    repostedStatus={status}
                    diableLeftPadding={disableLeftPadding}
                    hideBorders
                />
            </CardContent>
        </Card>
    );
};

export const RepostNotification = localized(_RepostNotification);
