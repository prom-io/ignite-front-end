import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import {
    Avatar,
    Grid,
    Typography,
    Link as MaterialLink,
    Hidden,
    useTheme
} from "@material-ui/core";

import { UserBalance } from "./UserBalance";
import { UserProfileTab } from "./UserProfileTab";
import { localized } from "../../localization/components";
import { Routes } from "../../routes";

const _UserGlobalCard = ({ currentUser, routerStore, l }) => {
    const theme = useTheme();

    return (
        <Grid container className="user-profile-header-content">
            <div className="user-profile-header-content-top">
                <Link
                    store={routerStore}
                    view={Routes.userProfile}
                    params={{ username: currentUser.username }}
                >
                    <Avatar
                        src={`${currentUser.avatar}?size=${100}`}
                        style={{
                            width: "94px",
                            height: "94px",
                            border: `1px solid ${theme.palette.border.main}`,
                            margin: "0 auto"
                        }}
                    />
                </Link>
                <div className="user-card-info">
                    <Typography variant="h4">{currentUser.display_name}</Typography>
                    <Typography>@{currentUser.username}</Typography>
                    {currentUser.external_url && (
                        <MaterialLink
                            href={currentUser.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {currentUser.external_url}
                        </MaterialLink>
                    )}
                    {currentUser.bio && (
                        <Typography variant="h6" className="user-card-info-bio">
                            <Markdown source={currentUser.bio} plugins={[breaks]} />
                        </Typography>
                    )}
                </div>
                <div className="user-profile-header-content-bottom-follows">
                    <div>
                        <UserProfileTab
                            header={currentUser.statuses_count}
                            subheader={l("user.profile.posts")}
                            linkProps={{
                                view: Routes.userProfile,
                                params: {
                                    username: currentUser.username,
                                    id: currentUser.id
                                },
                                store: routerStore
                            }}
                        />
                        <UserProfileTab
                            header={currentUser.followers_count}
                            subheader={l("user.profile.followers")}
                            linkProps={{
                                view: Routes.userFollowers,
                                params: {
                                    username: currentUser.username,
                                    id: currentUser.id
                                },
                                store: routerStore
                            }}
                        />
                        <UserProfileTab
                            header={currentUser.follows_count}
                            subheader={l("user.profile.following")}
                            linkProps={{
                                view: Routes.userFollowing,
                                params: {
                                    username: currentUser.username,
                                    id: currentUser.id
                                },
                                store: routerStore
                            }}
                        />
                    </div>
                    <Hidden smDown>
                        <div>
                            <UserProfileTab
                                header={0}
                                subheader={l("user.profile.communities")}
                                linkProps={{
                                    view: Routes.userCommunities,
                                    params: {
                                        username: currentUser.username,
                                        id: currentUser.id
                                    },
                                    store: routerStore
                                }}
                            />
                        </div>
                    </Hidden>
                </div>
            </div>
            <UserBalance
                overallBalance={currentUser.overall_balance}
                blockchainBalance={currentUser.blockchain_balance}
                pendingRewardsSum={currentUser.pending_rewards_sum}
            />
        </Grid>
    );
};

const mapMobxToProps = ({ authorization, store }) => ({
    currentUser: authorization.currentUser,
    routerStore: store
});

export const UserGlobalCard = localized(
    inject(mapMobxToProps)(observer(_UserGlobalCard))
);
