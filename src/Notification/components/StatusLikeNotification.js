import React from 'react';
import { Card, CardContent, makeStyles, useMediaQuery, useTheme, Hidden } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { HeartOrangeIcon } from '../../icons/HeartOrangeIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    cardContentRoot: {
        display: 'flex',
        padding: '0px !important',
    },
    notificationLeftContainer: {
        backgroundColor: '#FFFBF8',
        borderRight: '1px solid #F1EBE8',
        paddingLeft: theme.spacing(6),
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
                <Hidden smDown>
                    <div className={classes.notificationLeftContainer} />
                </Hidden>
                <RepostedStatusContent
                    repostedStatus={status}
                    disableLeftPadding={disableLeftPadding}
                    disableStatusCardHeaderAlign
                    hideBorders
                />
            </CardContent>
        </Card>
    );
};

export const StatusLikeNotification = localized(_StatusLikeNotification);
