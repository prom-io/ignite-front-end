import React from 'react';
import {Card, CardContent, makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { ReplyOutlinedIcon } from '../../icons/ReplyOutlinedIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    cardContentRoot: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(6) + 2,
        },
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
                icon={<ReplyOutlinedIcon />}
            />
            <CardContent
                classes={{
                    root: classes.cardContentRoot,
                }}
            >
                <RepostedStatusContent
                    repostedStatus={status}
                    diableLeftPadding={disableLeftPadding}
                />
            </CardContent>
        </Card>
    );
};

export const StatusReplyNotification = localized(_StatusReplyNotification);
