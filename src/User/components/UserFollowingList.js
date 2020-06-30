import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core';

import { UsersList } from './UsersList';
import { UserEmptyList } from './UserEmptyList';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '150px',
        display: 'table',
    },
}));

const _UserFollowingList = ({ following, pending }) => {
    const classes = useStyles();

    return pending ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : following.length ? (
        <UsersList users={following} />
    ) : (
        <UserEmptyList emptyTag="following" />
    );
};

const mapMobxToProps = ({ userFollowing }) => ({
    pending: userFollowing.pending,
    following: userFollowing.following,
});

export const UserFollowingList = inject(mapMobxToProps)(
    observer(_UserFollowingList),
);
