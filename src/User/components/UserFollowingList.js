import React from 'react';
import { inject, observer } from 'mobx-react';
import { Card, CircularProgress, makeStyles } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';
import useTheme from '@material-ui/core/styles/useTheme';
import { UsersList } from './UsersList';

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
    const theme = useTheme();

    return following.length === 0 && pending
        ? <div className={classes.centered}><FadeLoader css="transform: scale(0.5)" color={theme.palette.primary.main} /></div>
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
