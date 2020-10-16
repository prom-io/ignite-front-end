import React from "react";
import { inject, observer } from "mobx-react";
import { Grid, Hidden, makeStyles } from "@material-ui/core";

import {
    UserProfileHeader,
    UserFollowersList,
    UserFollowingList,
    UserCommunitiesList
} from "./";
import { UserProfileTimeline } from "../../Status/components";
import { WhoToFollow, UnfollowDialog } from "../../Follow/components";
import {
    ExploreOurFeaturesDescription,
    DescriptionStoaBanner
} from "../../PrometeusDescription";
import Loader from "../../components/Loader";
import { Routes } from "../../routes";
import { routerStore } from "../../store";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "150px",
        display: "table",
        [theme.breakpoints.down("sm")]: {
            marginTop: "50px"
        }
    }
}));

const _UserProfileContainer = ({
    user,
    fetchingUser,
    error,
    activeTab,
    followUser,
    unfollowUser,
    openUnfollowDialog,
    setOpenUnfollowDialog,
    setActiveTab,
    currentUser
}) => {
    const classes = useStyles();

    if (error) {
        routerStore.router.goTo(Routes.notFound);
    }

    let tabContent;
    switch (activeTab) {
        case "posts":
            tabContent = <UserProfileTimeline />;
            break;
        case "followers":
            tabContent = <UserFollowersList />;
            break;
        case "following":
            tabContent = <UserFollowingList />;
            break;
        case "communities":
            tabContent = <UserCommunitiesList />;
            break;
        default:
            tabContent = <UserProfileTimeline />;
            break;
    }

    if (fetchingUser || !user) {
        return (
            <div className={classes.centered}>
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <Grid container className="content-container">
            <Grid item className="user-profile-header">
                <UserProfileHeader
                    followers={user.followers_count}
                    following={user.follows_count}
                    avatar={user.avatar}
                    statuses={user.statuses_count}
                    activeTab={activeTab}
                    currentUserFollows={user.following}
                    onFollowRequest={followUser}
                    onUnfollowRequest={setOpenUnfollowDialog}
                    onTabSelected={setActiveTab}
                    username={user.username}
                    displayName={user.display_name}
                    bio={user.bio}
                    externalUrl={user.external_url}
                    currentUser={currentUser}
                    currentUserFollowingCount={
                        currentUser && currentUser.follows_count
                    }
                    createdAt={new Date(user.created_at)}
                />
                <Hidden smDown>
                    <DescriptionStoaBanner />
                </Hidden>
            </Grid>
            <Grid item className="user-profile-content-container">
                {tabContent}
            </Grid>
            <Grid item className="right-banners-container">
                {currentUser ? (
                    <Hidden only={["md"]}>
                        <WhoToFollow />
                    </Hidden>
                ) : (
                    <ExploreOurFeaturesDescription />
                )}
            </Grid>
            <UnfollowDialog
                username={user.username}
                unfollowAction={unfollowUser}
                unfollowDialogOpen={openUnfollowDialog}
                setUnfollowDialogOpen={setOpenUnfollowDialog}
            />
        </Grid>
    );
};

const mapMobxToProps = ({ userProfile, authorization }) => ({
    user: userProfile.user,
    fetchingUser: userProfile.fetchingUser,
    error: userProfile.error,
    activeTab: userProfile.activeTab,
    followUser: userProfile.followUser,
    unfollowUser: userProfile.unfollowUser,
    openUnfollowDialog: userProfile.openUnfollowDialog,
    setOpenUnfollowDialog: userProfile.setOpenUnfollowDialog,
    setActiveTab: userProfile.setActiveTab,
    currentUser: authorization.currentUser
});

export const UserProfileContainer = inject(mapMobxToProps)(
    observer(_UserProfileContainer)
);
