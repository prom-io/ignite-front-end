import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, makeStyles } from '@material-ui/core';
import { UsersList } from './UsersList';
import Loader from '../../components/Loader';

const useStyles = makeStyles((theme) => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    cardContainer: {
        boxShadow: 'none',
        border: `1px solid ${theme.palette.border.main}`,
    },
}));

const _UserFollowingList = ({ following, pending }) => {
    const classes = useStyles();

    return following.length === 0 && pending
        ? <div className={classes.centered}><Loader size={'md'}/></div>
        : (
            <Card className={classes.cardContainer}>
                <UsersList users={following} />
            </Card>
        );
};

const mapMobxToProps = ({ userFollowing }) => ({
    pending: userFollowing.pending,
    following: userFollowing.following,
});

export const UserFollowingList = inject(mapMobxToProps)(observer(_UserFollowingList));
