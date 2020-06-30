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

const _UserFollowersList = ({ followers, pending }) => {
    const classes = useStyles();

    return pending ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : followers.length ? (
        <UsersList users={followers} />
    ) : (
        <UserEmptyList emptyTag="followers" />
    );
};

const mapMobxToProps = ({ userFollowers }) => ({
    pending: userFollowers.pending,
    followers: userFollowers.followers,
});

export const UserFollowersList = inject(mapMobxToProps)(
    observer(_UserFollowersList),
);
