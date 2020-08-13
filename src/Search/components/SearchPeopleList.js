import React from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, makeStyles } from "@material-ui/core";

import { UnfollowDialog } from "../../Follow/components";
import Loader from "../../components/Loader";
import { SearchPeopleItem } from "../../Search/components";
import { localized } from "../../localization/components";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        display: "table"
    },
    notFound: {
        textAlign: "center",
        border: "1px solid #F1EBE8",
        borderTop: 0,
        fontSize: "20px",
        padding: "20px"
    }
}));

const _SearchPeopleList = ({
    searchValuePageIsTouched,
    searchResult,
    hasMore,
    pending,
    fetchSearchPeople,
    currentUser,
    actionWithFollow,
    selectedUser,
    unfollowUser,
    setUnfollowDialogOpen,
    unfollowDialogOpen,
    l
}) => {
    const classes = useStyles();

    return (
        <>
            {pending && searchResult.length === 0 && (
                <div className={classes.centered}>
                    <Loader size="lg" />
                </div>
            )}
            {!pending && searchResult.length === 0 && !searchValuePageIsTouched && (
                <Typography variant="h2" classes={{ root: classes.notFound }}>
                    {l("search.people.not-found")}
                </Typography>
            )}
            {searchResult.length !== 0 && (
                <InfiniteScroll
                    next={fetchSearchPeople}
                    hasMore={hasMore}
                    loader={
                        <div className={classes.centered}>
                            <Loader size="lg" />
                        </div>
                    }
                    dataLength={searchResult.length}
                    style={{ overflowY: "hidden" }}
                >
                    {searchResult.map(user => (
                        <SearchPeopleItem
                            key={user.id}
                            user={user}
                            currentUser={currentUser}
                            actionWithFollow={actionWithFollow}
                        />
                    ))}
                </InfiniteScroll>
            )}
            <UnfollowDialog
                username={selectedUser.username}
                unfollowAction={unfollowUser}
                unfollowDialogOpen={unfollowDialogOpen}
                setUnfollowDialogOpen={setUnfollowDialogOpen}
            />
        </>
    );
};

const mapMobxToProps = ({ searchUsers, authorization, followAction }) => ({
    searchValuePageIsTouched: searchUsers.searchValuePageIsTouched,
    searchResult: searchUsers.searchResultPage,
    hasMore: searchUsers.hasMore,
    pending: searchUsers.pendingPage,
    fetchSearchPeople: searchUsers.fetchSearchPeople,
    currentUser: authorization.currentUser,
    actionWithFollow: followAction.actionWithFollow,
    selectedUser: followAction.selectedUser,
    unfollowUser: followAction.unfollowUser,
    setUnfollowDialogOpen: followAction.setUnfollowDialogOpen,
    unfollowDialogOpen: followAction.unfollowDialogOpen
});

export const SearchPeopleList = localized(
    inject(mapMobxToProps)(observer(_SearchPeopleList))
);
