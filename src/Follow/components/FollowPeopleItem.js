import React from 'react';
import { inject } from 'mobx-react';
import { Avatar, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'mobx-router';

import { FollowButton } from './';
import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';
import { trimString } from '../../utils/string-utils';
import { Routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    followPeopleItem: {
        display: 'flex',
        padding: 16,
        border: `1px solid ${theme.palette.border.main}`,
        borderTop: 'none',
        textDecoration: 'none',

        '&:hover': {
            background: theme.palette.background.light,
        },
    },
    followPeopleItemAvatar: {
        marginRight: 12,
        height: 35,
        width: 35,
    },
    followPeopleItemContent: {
        width: '100%',

        '& > p': {
            fontWeight: 300,
            fontSize: '13px',
            lineHeight: '16px',
            margin: '4px 0 0',
            color: theme.palette.text.main,
        },
    },
    followPeopleItemRow: {
        display: 'flex',
        justifyContent: 'space-between',

        '& p': {
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '18px',
            textDecoration: 'none',
            color: theme.palette.text.main,
        },

        '& small': {
            fontWeight: 300,
            fontSize: '15px',
            lineHeight: '18px',
            color: theme.palette.text.secondary,
        },
    },
}));

const _FollowPeopleItem = ({ user, actionWithFollow, routerStore }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.followPeopleItem}
            key={user.id}
            view={Routes.userProfile}
            params={{ username: user.username }}
            store={routerStore}
        >
            <Avatar
                className={classes.followPeopleItemAvatar}
                src={ user.avatar }
            />
            <div className={classes.followPeopleItemContent}>
                <div className={classes.followPeopleItemRow}>
                    <Typography>
                        <div>{trimString(user.display_name, 16)}</div>
                        <small>
                            @
                            {trimString(user.username, 16)}
                        </small>
                    </Typography>
                    <ClickEventPropagationStopper>
                        <FollowButton
                            user={user}
                            actionWithFollow={actionWithFollow}
                            size="lg"
                        />
                    </ClickEventPropagationStopper>
                </div>
                <p>{user.bio}</p>
            </div>
        </Link>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const FollowPeopleItem = inject(mapMobxToProps)(_FollowPeopleItem);
