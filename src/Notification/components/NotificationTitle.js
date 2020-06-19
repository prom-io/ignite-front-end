import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'mobx-router';
import { Avatar, CardHeader, makeStyles, Typography } from '@material-ui/core';
import { Routes } from '../../routes';
import { SmallEllipseIcon } from '../../icons/SmallEllipseIcon';
import { getCreatedAtLabel } from '../../utils/date-utlis';
import { trimString } from "../../utils/string-utils";

const useStyles = makeStyles(theme => ({
    userLink: {
        color: theme.palette.primary.main,
    },
    undecoratedLink: {
        textDecoration: 'none',
    },
    notificationTitleContainer: {
        paddingLeft: 0,
        paddingTop: 0,
        display: 'flex',
    },
    notificationTitle: {
        display: 'flex',
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    notificationTitleTypography: {
        paddingBottom: theme.spacing(1),
    },
    createdAtTypography: {
        marginLeft: 12,
        fontSize: 12,
        paddingTop: theme.spacing(1) / 2,
        color: '#A2A2A2',
    },
    cardHeaderRoot: {
        display: 'flex',
        alignItems: 'center',
    },
    iconContainer: props => ({
        backgroundColor: theme.palette.background.light,
        borderRight: `1px solid ${theme.palette.border.main}`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2) + props.pixelsToAddToIconRightPadding,
        alignItems: 'center',
        display: 'flex',
    }),
    cardHeaderAvatar: {
        marginRight: 0,
    },
}));

const _NotificationTitle = ({ user, actionLabel, icon, createdAt, dateFnsLocale, routerStore, pixelsToAddToIconRightPadding = 0 }) => {
    const classes = useStyles({ pixelsToAddToIconRightPadding });

    return (
        <div className={classes.notificationTitleContainer}>
            <div className={classes.iconContainer}>
                {icon}
            </div>
            <CardHeader
                avatar={(
                    <Link
                        view={Routes.userProfile}
                        params={{ username: user.username }}
                        store={routerStore}
                        className={classes.undecoratedLink}
                    >
                        <Avatar
                            src={user.avatar}
                            style={{
                                width: 35,
                                height: 35,
                            }}
                        />
                    </Link>
                )}
                title={(
                    <div className={classes.notificationTitle}>
                        <Typography className={classes.notificationTitleTypography}>
                            <Link
                                view={Routes.userProfile}
                                params={{ username: user.username }}
                                store={routerStore}
                                className={classes.userLink}
                            >
                                @
                                {trimString(user.username, 25)}
                            </Link>
                            {' '}
                            {actionLabel}
                        </Typography>
                        <Typography className={classes.createdAtTypography}>
                            <SmallEllipseIcon />
                            {' '}
                            {getCreatedAtLabel(new Date(createdAt), dateFnsLocale, false)}
                        </Typography>
                    </div>
                )}
                classes={{
                    root: classes.cardHeaderRoot,
                    avatar: classes.cardHeaderAvatar,
                }}
            />
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const NotificationTitle = inject(mapMobxToProps)(observer(_NotificationTitle));
