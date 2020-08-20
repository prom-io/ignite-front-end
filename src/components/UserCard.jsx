import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import { Avatar, Grid, Typography, useTheme } from "@material-ui/core";

import { localized } from "../localization/components";
import { Routes } from "../routes";

const _UserCard = ({
    currentUser,
    routerStore,
    isLogin,
    src,
    username,
    displayName,
    bio,
    external_url,
    user_balance,
    posts,
    followers,
    following,
    l
}) => {
    const theme = useTheme();

    return (
        <div className="user-profile-card">
            {isLogin && (
                <>
                    <Link
                        store={routerStore}
                        view={Routes.userProfile}
                        params={{ username }}
                    >
                        <div className="user-card-top user-card-content-box">
                            <Avatar
                                src={`${src}?size=${100}`}
                                style={{
                                    width: 90,
                                    height: 90,
                                    minWidth: 90,
                                    minHeight: 90,
                                    border: `1px solid ${theme.palette.border.main}`
                                }}
                            />
                        </div>
                    </Link>
                    <div className="user-card-bottom user-card-content-box">
                        <div className="user-card-info">
                            <h4>{displayName}</h4>
                            <p>@{username}</p>
                            {external_url && (
                                <a
                                    href={external_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {external_url}
                                </a>
                            )}
                            {bio && (
                                <div className="user-card-info-bio">
                                    <Markdown source={bio} plugins={[breaks]} />
                                </div>
                            )}
                        </div>

                        <Grid className="user-profile-header-content-bottom">
                            <Grid className="user-profile-header-content-bottom-follows user-card-statistic">
                                <Link
                                    store={routerStore}
                                    view={Routes.userProfile}
                                    params={{
                                        username: currentUser.username,
                                        id: currentUser.id
                                    }}
                                >
                                    <Typography variant="h6">{posts}</Typography>
                                    <Typography variant="body1">
                                        {l("user.profile.posts")}
                                    </Typography>
                                </Link>
                                <Link
                                    store={routerStore}
                                    view={Routes.userFollowers}
                                    params={{
                                        username: currentUser.username,
                                        id: currentUser.id
                                    }}
                                >
                                    <Typography variant="h6">{followers}</Typography>
                                    <Typography variant="body1">
                                        {l("user.profile.followers")}
                                    </Typography>
                                </Link>
                                <Link
                                    store={routerStore}
                                    view={Routes.userFollowing}
                                    params={{
                                        username: currentUser.username,
                                        id: currentUser.id
                                    }}
                                >
                                    <Typography variant="h6">{following}</Typography>
                                    <Typography variant="body1">
                                        {l("user.profile.following")}
                                    </Typography>
                                </Link>
                            </Grid>
                            <div className="user-profile-header-content-bottom-balance">
                                {l("user.profile.your-balance")}:{" "}
                                {Number(user_balance).toFixed(2)} PROM
                            </div>
                        </Grid>
                    </div>
                </>
            )}
        </div>
    );
};

const mapMobxToProps = ({ authorization, userCard, store }) => ({
    currentUser: authorization.currentUser,
    routerStore: store,
    isLogin: Boolean(userCard.user),
    src: userCard.user && userCard.user.avatar,
    username: userCard.user && userCard.user.username,
    displayName: userCard.user && userCard.user.display_name,
    bio: userCard.user && userCard.user.bio,
    external_url: userCard.user && userCard.user.external_url,
    user_balance: userCard.user && userCard.user.user_balance,
    followers: userCard.user && userCard.user.followers_count,
    posts: userCard.user && userCard.user.statuses_count,
    following: userCard.user && userCard.user.follows_count
});

export const UserCard = localized(inject(mapMobxToProps)(observer(_UserCard)));
