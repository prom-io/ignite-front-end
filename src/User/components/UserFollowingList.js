import React from "react";
import {inject, observer} from "mobx-react";
import {Card, CircularProgress, makeStyles} from "@material-ui/core";
import {UsersList} from "./UsersList";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    cardContainer: {
        boxShadow: 'none',
        border: '1px solid #F1EBE8'
    }
}));

const _UserFollowingList = ({following, pending}) => {
    const classes = useStyles();

    return following.length === 0 && pending
        ? <CircularProgress size={15} className={classes.centered}/>
        : (
            <Card className={classes.cardContainer}>
                <UsersList users={following}/>
            </Card>
        )
};

const mapMobxToProps = ({userFollowing}) => ({
    pending: userFollowing.pending,
    following: userFollowing.following
});

export const UserFollowingList = inject(mapMobxToProps)(observer(_UserFollowingList));
