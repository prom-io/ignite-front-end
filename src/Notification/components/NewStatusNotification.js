import React from 'react';
import { Card, CardContent, Hidden, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { localized } from '../../localization/components';
import { IgniteOrangeIcon } from '../../icons/IgniteOrangeIcon';

const useStyles = makeStyles(theme => ({
    notificationLeftContainer: {
        backgroundColor: '#FFFBF8',
        paddingLeft: theme.spacing(6),
    },
    cardContentRoot: {
        display: 'flex',
        padding: '0px !important',
    },
}));

const _NewStatusNotifications = ({ notification, l, dateFnsLocale }) => {
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
                actionLabel={l('notification.new-post')}
                icon={<IgniteOrangeIcon />}
                pixelsToAddToIconRightPadding={4}
                createdAt={notification.created_at}
                dateFnsLocale={dateFnsLocale}
            />
            <CardContent classes={{
                root: classes.cardContentRoot,
            }}
            >
                <Hidden xsDown>
                    <div className={classes.notificationLeftContainer} />
                </Hidden>
                <RepostedStatusContent
                    disableLeftPadding={disableLeftPadding}
                    repostedStatus={status}
                    hideBorders
                />
            </CardContent>
        </Card>
    );
};

export const NewStatisNotification = localized(_NewStatusNotifications);
