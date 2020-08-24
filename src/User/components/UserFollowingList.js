import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

import { UsersList } from "./UsersList";
import { UserEmptyList } from "./UserEmptyList";
import Loader from "../../components/Loader";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "150px",
        display: "table"
    }
}));

const _UserFollowingList = ({ following, pending, hasMore, fetchFollowing }) => {
    const classes = useStyles();

    return pending && following.length === 0 ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : following.length ? (
        <UsersList
            users={following}
            hasMore={hasMore}
            onNextPageRequest={fetchFollowing}
        />
    ) : (
        <UserEmptyList emptyTag="following" />
    );
};

const mapMobxToProps = ({ userFollowing }) => ({
    pending: userFollowing.pending,
    following: userFollowing.following,
    fetchFollowing: userFollowing.fetchFollowing,
    hasMore: userFollowing.hasMore
});

export const UserFollowingList = inject(mapMobxToProps)(
    observer(_UserFollowingList)
);
