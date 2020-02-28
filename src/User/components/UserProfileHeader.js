import React from "react";
import {Button, Grid} from "@material-ui/core";
import {UserProfileAvatar} from "./UserProfileAvatar";
import {UserProfileTab} from "./UserProfileTab";
import {addLineBreak} from "../../utils/string-utils";

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
    displayName,
    currentUser
}) => {
    let followButton = null;

    if (currentUser && currentUser.username !== username) {
        followButton = currentUserFollows
            ? (
                <Grid  className="user-profile-header-content-bottom-follow-button">
                    <Button variant="contained"
                            color="primary"
                            onClick={() => onUnfollowRequest(username)}
                            disableElevation
                    >
                        Unfollow
                    </Button>
                </Grid>
            )
            : (
                <Grid  className="user-profile-header-content-bottom-follow-button">
                    <Button variant="contained"
                            color="primary"
                            onClick={() => onFollowRequest(username)}
                            disableElevation
                    >
                        Follow
                    </Button>

                </Grid>
            )
    }

    return (
        <Grid container  className="user-profile-header-content another-user">
            <Grid className="user-profile-header-content-top">
                <Grid container>
                    <Grid item xs={12} className="justify-content-center">
                        <UserProfileAvatar avatarUrl={avatar}/>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="user-card-username">
                            <h4>{addLineBreak(username)}</h4>
                            <p>{addLineBreak(displayName) }</p>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="user-profile-header-content-bottom">
                <Grid style={{display: "flex", padding: 10}} className="user-profile-header-content-bottom-follows">
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
                {followButton}
            </Grid>
        </Grid>
    )
};
