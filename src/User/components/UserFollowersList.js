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

const _UserFollowersList = ({ followers, pending, hasMore, fetchFollowers }) => {
    const classes = useStyles();

    return pending && followers.length === 0 ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : followers.length ? (
        <UsersList
            users={followers}
            hasMore={hasMore}
            onNextPageRequest={fetchFollowers}
        />
    ) : (
        <UserEmptyList emptyTag="followers" />
    );
};

const mapMobxToProps = ({ userFollowers }) => ({
    pending: userFollowers.pending,
    followers: userFollowers.followers,
    hasMore: userFollowers.hasMore,
    fetchFollowers: userFollowers.fetchUserFollowers
});

export const UserFollowersList = inject(mapMobxToProps)(
    observer(_UserFollowersList)
);
