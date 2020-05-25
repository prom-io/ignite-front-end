import React from 'react';
import { Card, CardContent, makeStyles, useMediaQuery, useTheme, Hidden } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { ReplyOrangeIcon } from '../../icons/ReplyOrangeIcon';
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
                <Hidden smDown>
                    <div className={classes.notificationLeftContainer} />
                </Hidden>
                <RepostedStatusContent
                    repostedStatus={status}
                    diableLeftPadding={disableLeftPadding}
                    disableStatusCardHeaderAlign
                    hideBorders
                />
            </CardContent>
        </Card>
    );
};

export const RepostNotification = localized(_RepostNotification);
