import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'mobx-router';
import { Card, makeStyles } from '@material-ui/core';
import { NotificationTitle } from './NotificationTitle';
import { localized } from '../../localization/components';
import { IgniteOutlinedIcon } from '../../icons/IgniteOutlinedIcon';
import { Routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    cardContentRoot: {
        display: 'flex',
        padding: '0px !important',
    },
    postLink: {
        color: theme.palette.primary.main,
    },
}));

const translationsMap = {
    en: ({ classes, routerStore, statusId }) => (
        <span>
            published new
            {' '}
            <Link className={classes.postLink} view={Routes.status} params={{ id: statusId }} store={routerStore}>post</Link>
        </span>
    ),
    kr: ({ classes, routerStore, statusId }) => (
        <span>
            <Link className={classes.postLink} view={Routes.status} params={{ id: statusId }} store={routerStore}>게시물</Link>
            {' '}
            오르다
        </span>
    ),
};

const _NewStatusNotifications = ({ notification, locale, routerStore, dateFnsLocale }) => {
    const classes = useStyles();
    const status = notification.payload;
    const user = status.account;

    return (
        <Card
            elevation={0}
            className="notificationCardBox"
        >
            <NotificationTitle
                user={user}
                actionLabel={translationsMap[locale]({ classes, routerStore, statusId: status.id })}
                icon={<IgniteOutlinedIcon />}
                pixelsToAddToIconRightPadding={4}
                createdAt={notification.created_at}
                dateFnsLocale={dateFnsLocale}
            />
        </Card>
    );
};

const mapMobxToProps = ({ store }) => ({ routerStore: store });

export const NewStatusNotification = localized(
    inject(mapMobxToProps)(observer(_NewStatusNotifications)),
);
