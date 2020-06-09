import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'mobx-router';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Avatar, Grid, Typography } from '@material-ui/core';

import { localized } from '../localization/components';
import { Routes } from '../routes';
import { addLineBreak } from '../utils/string-utils';

const _UserCard = ({
    currentUser,
    routerStore,
    isLogin,
    src,
    username,
    displayName,
    bio,
    posts,
    followers,
    following,
    l,
}) => (
    <div className="user-profile-card">
        {isLogin ? (
            <>
                <Link
                    store={routerStore}
                    view={Routes.userProfile}
                    params={{ username }}
                >
                    <div className="user-card-top user-card-content-box">
                        <Avatar
                            src={src}
                            style={{
                                width: 90,
                                height: 90,
                                minWidth: 90,
                                minHeight: 90,
                                border: '1px solid #F1EBE8',
                            }}
                        />
                    </div>
                </Link>
                <div className="user-card-bottom user-card-content-box">
                    <div className="user-card-info">
                        <h4>{addLineBreak(username)}</h4>
                        <p>{addLineBreak(displayName)}</p>
                        {bio && (
                            <div className="user-card-info-bio">
                                <Markdown source={bio} plugins={[breaks]} />
                            </div>
                        )}
                    </div>

                    <Grid className="user-profile-header-content-bottom">
                        <Grid
                            style={{ display: 'flex', padding: 20 }}
                            className="user-profile-header-content-bottom-follows user-card-statistic"
                        >
                            <Link
                                store={routerStore}
                                view={Routes.userProfile}
                                params={{
                                    username: currentUser.id,
                                    tab: 'posts',
                                }}
                            >
                                <Typography variant="h6">{posts}</Typography>
                                <Typography variant="body1">
                                    {l('user.profile.posts')}
                                </Typography>
                            </Link>
                            <Link
                                store={routerStore}
                                view={Routes.userProfile}
                                params={{
                                    username: currentUser.id,
                                    tab: 'followers',
                                }}
                            >
                                <Typography variant="h6">{followers}</Typography>
                                <Typography variant="body1">
                                    {l('user.profile.followers')}
                                </Typography>
                            </Link>
                            <Link
                                store={routerStore}
                                view={Routes.userProfile}
                                params={{
                                    username: currentUser.id,
                                    tab: 'following',
                                }}
                            >
                                <Typography variant="h6">{following}</Typography>
                                <Typography variant="body1">
                                    {l('user.profile.following')}
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </>
        ) : (
            <div className="user-card-notauth-box">
                <div className="user-card-notauth">
                    <img src="/user-card-search.png" alt="" />
                    <p>{l('user.card.follow-your-interests')}</p>
                </div>
                <div className="user-card-notauth">
                    <img src="/user-card-friend.png" alt="" />
                    <p>{l('user.card.hear-what-people-talking-about')}</p>
                </div>
                <div className="user-card-notauth">
                    <img src="/user-card-search.png" alt="" />
                    <p>{l('user.card.join-the-conversation')}</p>
                </div>
            </div>
        )}
    </div>
);

const mapMobxToProps = ({ authorization, userCard, store }) => ({
    currentUser: authorization.currentUser,
    routerStore: store,
    isLogin: Boolean(userCard.user),
    src: userCard.user && userCard.user.avatar,
    username: userCard.user && userCard.user.username,
    displayName: userCard.user && userCard.user.display_name,
    bio: userCard.user && userCard.user.bio,
    followers: userCard.user && userCard.user.followers_count,
    posts: userCard.user && userCard.user.statuses_count,
    following: userCard.user && userCard.user.follows_count,
});

export const UserCard = localized(inject(mapMobxToProps)(observer(_UserCard)));
