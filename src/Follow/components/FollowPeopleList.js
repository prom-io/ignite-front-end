import React from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core";

import { FollowPeopleItem, UnfollowDialog } from "./";
import { SearchUsersNotFound } from "../../Search/components";
import Loader from "../../components/Loader";
import { localized } from "../../localization/components";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        display: "table"
    }
}));

const _FollowPeopleList = ({
    currentUser,
    followInputValue,
    pending,
    hasMore,
    fetchFollowPeople,
    fetchSearchPeople,
    followPeopleItems,
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
            {pending && followPeopleItems.length === 0 && (
                <div className={classes.centered}>
                    <Loader size="lg" />
                </div>
            )}
            {!pending && followPeopleItems.length === 0 && <SearchUsersNotFound />}
            <div className="paddingBottomRoot">
                {followPeopleItems.length !== 0 && (
                    <InfiniteScroll
                        next={
                            followInputValue ? fetchSearchPeople : fetchFollowPeople
                        }
                        loader={
                            <div className={classes.centered}>
                                <Loader size="lg" />
                            </div>
                        }
                        dataLength={followPeopleItems.length}
                        style={{ overflowY: "hidden" }}
                        hasMore={hasMore}
                    >
                        {followPeopleItems.map(user => (
                            <FollowPeopleItem
                                currentUser={currentUser}
                                user={user}
                                actionWithFollow={actionWithFollow}
                            />
                        ))}
                    </InfiniteScroll>
                )}
            </div>
            <UnfollowDialog
                username={selectedUser.username}
                unfollowAction={unfollowUser}
                unfollowDialogOpen={unfollowDialogOpen}
                setUnfollowDialogOpen={setUnfollowDialogOpen}
            />
        </>
    );
};

const mapMobxToProps = ({ authorization, followPeople, followAction }) => ({
    currentUser: authorization.currentUser,
    followInputValue: followPeople.followInputValue,
    pending: followPeople.pending,
    hasMore: followPeople.hasMore,
    fetchFollowPeople: followPeople.fetchFollowPeople,
    fetchSearchPeople: followPeople.fetchSearchPeople,
    followPeopleItems: followPeople.followPeopleItems,
    actionWithFollow: followAction.actionWithFollow,
    selectedUser: followAction.selectedUser,
    unfollowUser: followAction.unfollowUser,
    setUnfollowDialogOpen: followAction.setUnfollowDialogOpen,
    unfollowDialogOpen: followAction.unfollowDialogOpen
});

export const FollowPeopleList = localized(
    inject(mapMobxToProps)(observer(_FollowPeopleList))
);
