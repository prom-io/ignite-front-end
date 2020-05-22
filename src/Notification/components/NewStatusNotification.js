import React from 'react';
import {Card, CardContent, makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { localized } from '../../localization/components';
import { ReplyOutlinedIcon } from '../../icons/ReplyOutlinedIcon';

const useStyles = makeStyles(theme => ({
    cardContentRoot: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(6) + 2,
        },
    },
}));

const _NewStatusNotifications = ({ notification, l }) => {
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
                icon={<ReplyOutlinedIcon />}
            />
            <CardContent
                classes={{
                    root: classes.cardContentRoot,
                }}
            >
                <RepostedStatusContent
                    disableLeftPadding={disableLeftPadding}
                    repostedStatus={status}
                />
            </CardContent>
        </Card>
    );
};

export const NewStatisNotification = localized(_NewStatusNotifications);
