import React from "react";
import {createStyles, makeStyles, Grid, Button} from "@material-ui/core";
import {UserProfileAvatar} from "./UserProfileAvatar";
import {UserProfileTab} from "./UserProfileTab";

const useStyles = makeStyles(() => ({
    userProfileHeader: {
        top: -290,
        position: "sticky"
    }
}));

export const UserProfileHeader = ({
    avatar,
    following,
    followers,
    currentUserFollows,
    statuses,
    activeTab,
    onFollowRequest,
    onUnfollowRequest,
    onTabSelected,
    username,
    currentUser
}) => {
    const classes = useStyles();

    let followButton = null;

    if (currentUser && currentUser.username !== username) {
        followButton = currentUserFollows
            ? (
                <Button variant="contained"
                        color="primary"
                        onClick={() => onUnfollowRequest(username)}
                        disableElevation
                >
                    Unfollow
                </Button>
            )
            : (
                <Button variant="contained"
                        color="primary"
                        onClick={() => onFollowRequest(username)}
                        disableElevation
                >
                    Follow
                </Button>
            )
    }

    return (
        <Grid container className={classes.userProfileHeader}>
            <Grid item xs={3}>
                <Grid container>
                    <Grid item xs={12}>
                        <UserProfileAvatar avatarUrl={avatar}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6} style={{display: "flex", padding: 10}} alignContent="space-between">
                <UserProfileTab active={activeTab === "posts"}
                                header={statuses}
                                subheader="Posts"
                                onSelectActive={() => onTabSelected("posts")}
                />
                <UserProfileTab active={activeTab === "followers"}
                                header={followers}
                                subheader="Followers"
                                onSelectActive={() => onTabSelected("followers")}
                />
                <UserProfileTab active={activeTab === "following"}
                                header={following}
                                subheader="Following"
                                onSelectActive={() => onTabSelected("following")}
                />
            </Grid>
            <Grid item xs={3}>
                {followButton}
            </Grid>
        </Grid>
    )
};
