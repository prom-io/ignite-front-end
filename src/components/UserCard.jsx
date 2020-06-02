import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import { Avatar, Grid } from '@material-ui/core';
import { localized } from "../localization/components";
import { Routes } from "../routes";
import { UserProfileTab } from '../User/components/UserProfileTab';


const lineBreak = param => param.slice(0, 21) + " " + param.slice(21);

const _UserCard = ({
    currentUser,
    activeTab,
    onTabSelected,
    routerStore,
    isLogin,
    src,
    username,
    displayName,
    posts,
    followers,
    follow,
    l
}) => {
    return isLogin ? (
      <div className="user-profile-card">
          <Link
            store={routerStore}
            view={Routes.userProfile}
            params={{ username: currentUser.id }}
          >
              <div className="user-card-top user-card-content-box">
                  <Avatar
                    src={src}
                    style={{
                        width: 90,
                        height: 90,
                        minWidth: 90,
                        minHeight: 90,
                        border: "1px solid #F1EBE8"
                    }}
                  />
              </div>
          </Link>
          <div className="user-card-bottom user-card-content-box">
              <div className="user-card-username">
                  <h4>{lineBreak(username)}</h4>
                  <p>{lineBreak(displayName)}</p>
              </div>
  
            <Grid className="user-profile-header-content-bottom">
              <Grid style={{ display: 'flex', padding: 20 }} className="user-profile-header-content-bottom-follows">
                  <UserProfileTab
                    active={activeTab === 'posts'}
                    header={posts}
                    subheader={l('user.profile.posts')}
                    onSelectActive={() => onTabSelected('posts')}
                  />
                  <UserProfileTab
                    active={activeTab === 'followers'}
                    header={followers}
                    subheader={l('user.profile.followers')}
                    onSelectActive={() => onTabSelected('followers')}
                  />
                  <UserProfileTab
                    active={activeTab === 'following'}
                    header={follow}
                    subheader={l('user.profile.following')}
                    onSelectActive={() => onTabSelected('following')}
                  />
              </Grid>
            </Grid>
          </div>
      </div>
    ) : (
        <div className="user-profile-card">
            <div className="user-card-notauth-box">
                <div className="user-card-notauth">
                    <img src="/user-card-search.png" alt="" />
                    <p>{l("user.card.follow-your-interests")}</p>
                </div>
                <div className="user-card-notauth">
                    <img src="/user-card-friend.png" alt="" />
                    <p>{l("user.card.hear-what-people-talking-about")}</p>
                </div>
                <div className="user-card-notauth">
                    <img src="/user-card-search.png" alt="" />
                    <p>{l("user.card.join-the-conversation")}</p>
                </div>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ userProfile,authorization, userCard, store }) => ({
    currentUser: authorization.currentUser,
    routerStore: store,
    isLogin: Boolean(userCard.user),
    src: userCard.user && userCard.user.avatar,
    username: userCard.user && userCard.user.username,
    displayName: userCard.user && userCard.user.display_name,
    followers: userCard.user && userCard.user.followers_count,
    posts: userCard.user && userCard.user.statuses_count,
    follow: userCard.user && userCard.user.follows_count,
    setActiveTab: userProfile.setActiveTab,
    activeTab: userProfile.activeTab,
    
});

export const UserCard = localized(
    inject(mapMobxToProps)(observer(_UserCard))
);
