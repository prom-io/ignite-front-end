import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import { Avatar, Grid, Typography, useTheme } from "@material-ui/core";

import { localized } from "../../localization/components";
import { Routes } from "../../routes";

const _UserGlobalCard = ({ currentUser, routerStore, l }) => {
    const theme = useTheme();

    return (
        <div className="user-profile-card">
            <Link
                store={routerStore}
                view={Routes.userProfile}
                params={{ username: currentUser.username }}
            >
                <div className="user-card-top user-card-content-box">
                    <Avatar
                        src={`${currentUser.avatar}?size=${100}`}
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
            <div className="user-card-content-box">
                <div className="user-card-info">
                    <Typography variant={'h4'}>
                      {currentUser.display_name}
                    </Typography>
                    <Typography>
                      @{currentUser.username}
                    </Typography>
                    {currentUser.external_url && (
                        <a
                            href={currentUser.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {currentUser.external_url}
                        </a>
                    )}
                    {currentUser.bio && (
                        <Typography variant={'h6'} className="user-card-info-bio">
                            <Markdown source={currentUser.bio} plugins={[breaks]} />
                        </Typography>
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
                            <Typography variant="h6">
                                {currentUser.statuses_count}
                            </Typography>
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
                            <Typography variant="h6">
                                {currentUser.followers_count}
                            </Typography>
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
                            <Typography variant="h6">
                                {currentUser.follows_count}
                            </Typography>
                            <Typography variant="body1">
                                {l("user.profile.following")}
                            </Typography>
                        </Link>
                    </Grid>
                    <Typography variant={'span'} className="user-profile-header-content-bottom-balance">
                        {l("user.profile.your-balance")}:{" "}
                        {Number(currentUser.user_balance).toFixed(2)} PROM
                    </Typography>
                </Grid>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ authorization, store }) => ({
    currentUser: authorization.currentUser,
    routerStore: store
});

export const UserGlobalCard = localized(
    inject(mapMobxToProps)(observer(_UserGlobalCard))
);
