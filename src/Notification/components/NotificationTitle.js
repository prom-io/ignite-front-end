import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'mobx-router';
import { Avatar, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { Routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    userLink: {
        color: theme.palette.primary.main,
    },
    notificationTitle: {
        display: 'flex',
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
    },
    cardHeaderRoot: {
        paddingTop: 0,
    },
}));

const _NotificationTitle = ({ user, actionLabel, icon, routerStore }) => {
    const classes = useStyles();

    return (
        <div className={classes.notificationTitle}>
            {icon}
            <CardHeader
                avatar={(
                    <Avatar
                        src={user.avatar}
                        style={{
                            width: 35,
                            height: 35,
                        }}
                    />
                )}
                title={(
                    <Typography>
                        <Link
                            view={Routes.userProfile}
                            params={{ username: user.id }}
                            store={routerStore}
                            className={classes.userLink}
                        >
                            @
                            {user.username}
                        </Link>
                        {` ${actionLabel}`}
                    </Typography>
                )}
                classes={{
                    root: classes.cardHeaderRoot,
                }}
            />
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const NotificationTitle = inject(mapMobxToProps)(observer(_NotificationTitle));
