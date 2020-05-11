import React from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import {UserProfileAvatar} from "./UserProfileAvatar";
import {UserProfileTab} from "./UserProfileTab";
import {addLineBreak} from "../../utils/string-utils";
import {localized} from "../../localization/components";
import {format} from "date-fns";

const _UserProfileHeader = ({
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
    createdAt,
    currentUser,
    l,
    dateFnsLocale
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
                        {l("user.profile.unfollow")}
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
                        {l("user.profile.follow")}
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
                                    subheader={l("user.profile.posts")}
                                    onSelectActive={() => onTabSelected("posts")}
                    />
                    <UserProfileTab active={activeTab === "followers"}
                                    header={followers}
                                    subheader={l("user.profile.followers")}
                                    onSelectActive={() => onTabSelected("followers")}
                    />
                    <UserProfileTab active={activeTab === "following"}
                                    header={following}
                                    subheader={l("user.profile.following")}
                                    onSelectActive={() => onTabSelected("following")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" noWrap className="user-profile-info-text justify-content-center">
                        {l("user.profile.member-since")} {format(createdAt, "MMMM yyyy", {locale: dateFnsLocale})}
                    </Typography>
                </Grid>
                {followButton}
            </Grid>
        </Grid>
    )
};

export const UserProfileHeader = localized(_UserProfileHeader);
