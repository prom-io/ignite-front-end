import React from 'react';
import {Card, CardContent, makeStyles, useMediaQuery, useTheme} from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { RepostedStatusContent } from '../../Status/components';
import { HeartOutlinedIcon } from '../../icons/HeartOutlinedIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    cardContentRoot: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(6) + 2,
        },
    },
}));

const _StatusLikeNotification = ({ notification, l }) => {
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
                icon={<HeartOutlinedIcon />}
            />
            <CardContent
                classes={{
                    root: classes.cardContentRoot,
                }}
            >
                <RepostedStatusContent
                    repostedStatus={status}
                    disableLeftPadding={disableLeftPadding}
                />
            </CardContent>
        </Card>
    );
};

export const StatusLikeNotification = localized(_StatusLikeNotification);
