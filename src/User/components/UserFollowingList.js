import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, CircularProgress, makeStyles } from '@material-ui/core';
import { UsersList } from './UsersList';
import { FadeLoader } from 'react-spinners';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    cardContainer: {
        boxShadow: 'none',
        border: '1px solid #F1EBE8',
    },
}));

const _UserFollowingList = ({ following, pending }) => {
    const classes = useStyles();

    return following.length === 0 && pending
        ? <div className={classes.centered}><FadeLoader css={'transform: scale(0.5)'} color={'#FF5C01'}/></div>
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
