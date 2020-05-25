import React from 'react';
import {Card, CardContent, Hidden, makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { ReplyOrangeIcon } from '../../icons/ReplyOrangeIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    notificationLeftContainer: {
        backgroundColor: '#FFFBF8',
        borderRight: '1px solid #F1EBE8',
        paddingLeft: theme.spacing(6),
    },
    cardContentRoot: {
        display: 'flex',
        padding: '0px !important',
    },
}));

const _StatusReplyNotification = ({ notification, l }) => {
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
                actionLabel={l('notification.reply')}
                icon={<ReplyOrangeIcon />}
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

export const StatusReplyNotification = localized(_StatusReplyNotification);
