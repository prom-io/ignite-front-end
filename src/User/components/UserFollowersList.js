import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, CircularProgress, makeStyles } from '@material-ui/core';
import { UsersList } from './UsersList';

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

const _UserFollowersList = ({ followers, pending }) => {
    const classes = useStyles();

    return followers.length === 0 && pending
        ? <CircularProgress size={15} className={classes.centered} />
        : (
            <Card className={classes.cardContainer}>
                <UsersList users={followers} />
            </Card>
        );
};

const mapMobxToProps = ({ userFollowers }) => ({
    pending: userFollowers.pending,
    followers: userFollowers.followers,
});

export const UserFollowersList = inject(mapMobxToProps)(observer(_UserFollowersList));
