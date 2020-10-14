import React from "react";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import { format } from "date-fns";
import { Button, Grid, Link, Typography } from "@material-ui/core";

import { UserProfileAvatar } from "./UserProfileAvatar";
import { UserProfileTab } from "./UserProfileTab";
import { UpdateUserProfileButton } from "./UpdateUserProfileButton";
import { UserProfileHeaderButton } from "./UserProfileHeaderButton";
import { UserBalance } from "./UserBalance";
import { localized } from "../../localization/components";
import { useRouter } from "../../store/hooks";
import { Routes } from "../../routes";

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
    bio,
    externalUrl,
    currentUserOverallBalance,
    currentUserBlockchainBalance,
    currentUserPendingRewardsSum,
    updateBalance,
    createdAt,
    currentUser,
    currentUserFollowingCount,
    l,
    dateFnsLocale
}) => {
    const store = useRouter();

    let profileButton = null;

    if (currentUser) {
        if (currentUser.username !== username) {
            profileButton = currentUserFollows ? (
                <div className="user-profile-header-content-bottom-follow-button">
                    <UserProfileHeaderButton
                        username={username}
                        onUnfollowRequest={onUnfollowRequest}
                    />
                </div>
            ) : (
                <div className="user-profile-header-content-bottom-follow-button">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onFollowRequest(username)}
                        disableElevation
                    >
                        {l("user.profile.follow")}
                    </Button>
                </div>
            );
        } else {
            profileButton = <UpdateUserProfileButton />;
        }
    }

    return (
        <Grid container className="user-profile-header-content">
            <div className="user-profile-header-content-top">
                <UserProfileAvatar avatarUrl={avatar} />
                <div className="user-card-info">
                    <Typography variant="h4">{displayName}</Typography>
                    <Typography>@{username}</Typography>
                    {externalUrl && (
                        <Link
                            href={externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {externalUrl}
                        </Link>
                    )}
                    {bio && (
                        <Typography variant="h6" className="user-card-info-bio">
                            <Markdown source={bio} plugins={[breaks]} />
                        </Typography>
                    )}
                </div>
                <div className="user-profile-header-content-bottom-follows">
                    <UserProfileTab
                        active={activeTab === "posts"}
                        header={
                            currentUser && currentUser.username === username
                                ? currentUser.statuses_count
                                : statuses
                        }
                        subheader={l("user.profile.posts")}
                        onSelectActive={() => onTabSelected("posts")}
                        linkProps={{
                            view: Routes.userProfile,
                            params: { username },
                            store
                        }}
                    />
                    <UserProfileTab
                        active={activeTab === "followers"}
                        header={
                            currentUser && currentUser.username === username
                                ? currentUser.followers_count
                                : followers
                        }
                        subheader={l("user.profile.followers")}
                        onSelectActive={() => onTabSelected("followers")}
                        linkProps={{
                            view: Routes.userFollowers,
                            params: { username },
                            store
                        }}
                    />
                    <UserProfileTab
                        active={activeTab === "following"}
                        header={
                            currentUser && currentUser.username === username
                                ? currentUserFollowingCount
                                : following
                        }
                        subheader={l("user.profile.following")}
                        onSelectActive={() => onTabSelected("following")}
                        linkProps={{
                            view: Routes.userFollowing,
                            params: { username },
                            store
                        }}
                    />
                </div>
                <Typography
                    variant="body1"
                    className="user-profile-info-member-since"
                    align="center"
                >
                    {l("user.profile.member-since")}{" "}
                    {format(createdAt, "MMMM yyyy", { locale: dateFnsLocale })}
                </Typography>
            </div>
            {currentUser && currentUser.username === username && (
                <UserBalance
                    overallBalance={currentUserOverallBalance}
                    blockchainBalance={currentUserBlockchainBalance}
                    pendingRewardsSum={currentUserPendingRewardsSum}
                    updateBalance={updateBalance}
                />
            )}
            {profileButton}
        </Grid>
    );
};

export const UserProfileHeader = localized(_UserProfileHeader);
