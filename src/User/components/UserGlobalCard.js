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
    useTheme
} from "@material-ui/core";

import { UserBalance } from "./UserBalance";
import { localized } from "../../localization/components";
import { Routes } from "../../routes";

const _UserGlobalCard = ({ currentUser, updateBalance, routerStore, l }) => {
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
                <div className="user-profile-header-content-bottom-follows user-card-statistic">
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
                </div>
            </div>
            <UserBalance
                overallBalance={currentUser.overall_balance}
                blockchainBalance={currentUser.blockchain_balance}
                pendingRewardsSum={currentUser.pending_rewards_sum}
                updateBalance={updateBalance}
            />
        </Grid>
    );
};

const mapMobxToProps = ({ authorization, store }) => ({
    currentUser: authorization.currentUser,
    updateBalance: authorization.updateBalance,
    routerStore: store
});

export const UserGlobalCard = localized(
    inject(mapMobxToProps)(observer(_UserGlobalCard))
);
