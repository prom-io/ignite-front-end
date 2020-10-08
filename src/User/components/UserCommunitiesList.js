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

const _UserCommunitiesList = ({
    communities,
    pending,
    hasMore,
    fetchCommunities
}) => {
    const classes = useStyles();

    return pending && communities.length === 0 ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : communities.length ? (
        <UsersList
            users={communities}
            hasMore={hasMore}
            onNextPageRequest={fetchCommunities}
        />
    ) : (
        <UserEmptyList emptyTag="communities" />
    );
};

const mapMobxToProps = ({ userCommunities }) => ({
    pending: userCommunities.pending,
    communities: userCommunities.communities,
    fetchCommunities: userCommunities.fetchCommunities,
    hasMore: userCommunities.hasMore
});

export const UserCommunitiesList = inject(mapMobxToProps)(
    observer(_UserCommunitiesList)
);
