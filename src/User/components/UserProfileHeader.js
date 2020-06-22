import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { format } from 'date-fns';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';
import { UserProfileAvatar } from './UserProfileAvatar';
import { UserProfileTab } from './UserProfileTab';
import { addLineBreak } from '../../utils/string-utils';
import { localized } from '../../localization/components';
import { UpdateUserProfileButton } from './UpdateUserProfileButton';
import {useRouter, useStore} from '../../store/hooks';
import { Routes } from '../../routes';

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
    createdAt,
    currentUser,
    l,
    dateFnsLocale,
}) => {
    const store = useRouter();

    let profileButton = null;

    if (currentUser) {
        if (currentUser.username !== username) {
            profileButton = currentUserFollows
                ? (
                    <Grid className="user-profile-header-content-bottom-follow-button">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onUnfollowRequest(username)}
                            disableElevation
                        >
                            {l('user.profile.unfollow')}
                        </Button>
                    </Grid>
                )
                : (
                    <Grid className="user-profile-header-content-bottom-follow-button">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onFollowRequest(username)}
                            disableElevation
                        >
                            {l('user.profile.follow')}
                        </Button>
                    </Grid>
                );
        } else {
            profileButton = <UpdateUserProfileButton />;
        }
    }

    return (
        <Grid container className="user-profile-header-content another-user">
            <Grid className="user-profile-header-content-top">
                <Grid container>
                    <Grid item xs={12} className="justify-content-center">
                        <UserProfileAvatar avatarUrl={avatar} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="user-card-info">
                            <h4>{addLineBreak(displayName)}</h4>
                            <p>{addLineBreak(username)}</p>
                            {bio && (
                                <div className="user-card-info-bio">
                                    <Markdown source={bio} plugins={[breaks]} />
                                </div>
                            )}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid className="user-profile-header-content-bottom">
                <Grid style={{ display: 'flex', padding: 20 }} className="user-profile-header-content-bottom-follows">
                    <UserProfileTab
                        active={activeTab === 'posts'}
                        header={statuses}
                        subheader={l('user.profile.posts')}
                        onSelectActive={() => onTabSelected('posts')}
                        linkProps={{
                            view: Routes.userProfile,
                            params: { username },
                            store
                        }}
                    />
                    <UserProfileTab
                        active={activeTab === 'followers'}
                        header={followers}
                        subheader={l('user.profile.followers')}
                        onSelectActive={() => onTabSelected('followers')}
                        linkProps={{
                            view: Routes.userFollowers,
                            params: { username },
                            store,
                        }}
                    />
                    <UserProfileTab
                        active={activeTab === 'following'}
                        header={following}
                        subheader={l('user.profile.following')}
                        onSelectActive={() => onTabSelected('following')}
                        linkProps={{
                            view: Routes.userFollowing,
                            params: { username },
                            store,
                        }}
                    />
                </Grid>
                <Grid item>
                    <Typography variant="body1" noWrap className="user-profile-info-text justify-content-center">
                        {l('user.profile.member-since')}
                        {' '}
                        {format(createdAt, 'MMMM yyyy', { locale: dateFnsLocale })}
                    </Typography>
                </Grid>
                {profileButton}
            </Grid>
        </Grid>
    );
};

export const UserProfileHeader = localized(_UserProfileHeader);
