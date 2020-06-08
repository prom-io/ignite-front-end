import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, CircularProgress, makeStyles } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';
import { UsersList } from './UsersList';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50px',
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
        ? <div className={classes.centered}><FadeLoader css="transform: scale(0.5)" color="#FF5C01" /></div>
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
