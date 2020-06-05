import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, Grid, Hidden, makeStyles } from '@material-ui/core';
import { UserProfileHeader } from './UserProfileHeader';
import { UserFollowersList } from './UserFollowersList';
import { UserFollowingList } from './UserFollowingList';
import { UserProfileTimeline } from '../../Status/components';
import { WhoToFollow } from '../../Follow/components/WhoToFollow';
import { ExploreOurFeaturesDescription } from '../../PrometeusDescription';
import { DescriptionNetworkBanner } from '../../PrometeusDescription/DescriptionNetworkBanner';
import { FadeLoader } from 'react-spinners';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
}));

const _UserProfileContainer = ({
    user,
    fetchingUser,
    relationships,
    fetchingRelationships,
    error,
    activeTab,
    followUser,
    unfollowUser,
    setActiveTab,
    currentUser,
}) => {
    const classes = useStyles();

    let tabContent;

    switch (activeTab) {
    case 'posts':
        tabContent = <UserProfileTimeline />;
        break;
    case 'followers':
        tabContent = <UserFollowersList />;
        break;
    case 'following':
        tabContent = <UserFollowingList />;
        break;
    default:
        tabContent = <UserProfileTimeline />;
        break;
    }

    if (fetchingUser || !user) {
        return (
          <div className={classes.centered}><FadeLoader css={'transform: scale(0.5)'} color={'#FF5C01'}/></div>
        );
    }

    return (
        <Grid container className="content-container">
            <Grid item className="user-profile-header">
                <UserProfileHeader
                    followers={user.followers_count}
                    following={user.follows_count}
                    avatar={user.avatar}
                    statuses={user.statuses_count}
                    activeTab={activeTab}
                    currentUserFollows={user.following}
                    onFollowRequest={followUser}
                    onUnfollowRequest={unfollowUser}
                    onTabSelected={setActiveTab}
                    username={user.username}
                    displayName={user.display_name}
                    bio={user.bio}
                    currentUser={currentUser}
                    createdAt={new Date(user.created_at)}
                />
                <DescriptionNetworkBanner />
            </Grid>
            <Grid item className="user-profile-content-container">
                {tabContent}
            </Grid>
            <Grid item className="right-banners-container">
                {currentUser ? (
                    <Hidden only={['md']}>
                        <WhoToFollow />
                    </Hidden>
                ) : (
                    <ExploreOurFeaturesDescription />
                )}
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ userProfile, authorization }) => ({
    user: userProfile.user,
    fetchingUser: userProfile.fetchingUser,
    relationships: userProfile.relationships,
    fetchingRelationships: userProfile.fetchingRelationships,
    error: userProfile.error,
    activeTab: userProfile.activeTab,
    followUser: userProfile.followUser,
    unfollowUser: userProfile.unfollowUser,
    setActiveTab: userProfile.setActiveTab,
    currentUser: authorization.currentUser,
});

export const UserProfileContainer = inject(mapMobxToProps)(observer(_UserProfileContainer));
