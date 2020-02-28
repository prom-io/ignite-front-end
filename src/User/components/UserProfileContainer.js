import React from "react";
import {inject, observer} from "mobx-react";
import {CircularProgress, Grid, makeStyles} from "@material-ui/core";
import {UserProfileHeader} from "./UserProfileHeader";
import {UserFollowersList} from "./UserFollowersList";
import {UserFollowingList} from "./UserFollowingList";
import {UserProfileTimeline} from "../../Status/components";
import {UserProfileInfo} from "./UserInfo";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    }
}));

const _UserProfileContainer = ({
    user,
    fetchingUser,
    relationships,
    fetchingRelationships,
    error,
    activeTab,
    followUser,
    unfollowUser,
    setActiveTab,
    currentUser
}) => {
    const classes = useStyles();

    let tabContent;

    switch (activeTab) {
        case "posts":
            tabContent = <UserProfileTimeline/>;
            break;
        case "followers":
            tabContent = <UserFollowersList/>;
            break;
        case "following":
            tabContent = <UserFollowingList/>;
            break;
        default:
            tabContent = <UserProfileTimeline/>;
            break;
    }

    if (fetchingUser || !user) {
        return (
            <CircularProgress size={50} color="primary" className={classes.centered}/>
        )
    }

    return (
        <Grid container spacing={2} className="user-profile-container">
            <Grid item xs={12} className="user-profile-header">
                <UserProfileHeader followers={user.followers_count}
                                   following={user.follows_count}
                                   avatar={user.avatar}
                                   statuses={user.statuses_count}
                                   activeTab={activeTab}
                                   currentUserFollows={user.following}
                                   onFollowRequest={followUser}
                                   onUnfollowRequest={unfollowUser}
                                   onTabSelected={setActiveTab}
                                   username={user.username}
                                   displayName={user.display_name}
                                   currentUser={currentUser}
                />
            </Grid>
            <Grid item xs={12} md={7} className="user-profile-content-container">
                <Grid className="user-profile-info">
                    <UserProfileInfo createdAt={new Date(user.created_at)}
                                     username={user.username}
                                     displayName={user.display_name}
                    />
                </Grid>
                {tabContent}
            </Grid>
        </Grid>
    )
};

const mapMobxToProps = ({userProfile, authorization}) => ({
    user: userProfile.user,
    fetchingUser: userProfile.fetchingUser,
    relationships: userProfile.relationships,
    fetchingRelationships: userProfile.fetchingRelationships,
    error: userProfile.error,
    activeTab: userProfile.activeTab,
    followUser: userProfile.followUser,
    unfollowUser: userProfile.unfollowUser,
    setActiveTab: userProfile.setActiveTab,
    currentUser: authorization.currentUser
});

export const UserProfileContainer = inject(mapMobxToProps)(observer(_UserProfileContainer));
