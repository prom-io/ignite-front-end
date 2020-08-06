import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles, Hidden, Grid } from '@material-ui/core';
import { StatusList } from './StatusList';
import { CreateStatusForm } from './CreateStatusForm';
import Loader from '../../components/Loader';
import { PenIcon } from '../../icons/PenIcon';
import { LoginForm } from '../../Authorization/components';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '150px',
        display: 'table',
        [theme.breakpoints.down('sm')]: {
            marginTop: '30px',
        },
    },
    profileCreateStatusForm: {
        paddingBottom: '0 !important',
    },
    profileStatusList: {
        paddingTop: '0 !important',
        [theme.breakpoints.down('md')]: {
            padding: '0px !important',
            paddingBottom: `${theme.spacing(1)}px !important`,
        },
    },
    profileNoPosts: {
        height: '100%',
        borderRadius: '4px',
        padding: '20px',
        border: `1px solid ${theme.palette.border.main}`,
        textAlign: 'center',
    },
    profileNoPostsIcon: {
        marginBottom: '12px',
    },
    profileNoPostsTitle: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '24px',
        color: '#1C1C1C',
        marginBottom: '12px',
    },
    profileNoPostsSubtitle: {
        fontFamily: 'Museo Sans Cyrl Regular',
        fontWeight: 300,
        fontSize: '15px',
        lineHeight: '16px',
        color: '#A2A2A2',
    },
}));

const _UserProfileTimeline = ({
    statuses,
    statusLikePendingMap,
    repostsPendingMap,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    unfollowStatusAuthor,
    fetchStatuses,
    pending,
    currentUser,
    profileOwnerId,
    hasMore,
}) => {
    const classes = useStyles();

    return pending ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : (
        <>
            {!currentUser && (
                <Grid item className="login-form-container">
                    <LoginForm hideSignUpButton={process.env.REACT_APP_HIDE_SIGN_UP_BUTTON === 'true'} />
                </Grid>
            )}
            <Grid container>
                {currentUser && currentUser.id === profileOwnerId && (
                    <Grid item xs={12} className={classes.profileCreateStatusForm}>
                        <Hidden smDown>
                            <CreateStatusForm />
                        </Hidden>
                    </Grid>
                )}
                {statuses.length === 0 && (
                    <Grid item xs={12} style={{ height: '100%' }}>
                        <div className={classes.profileNoPosts}>
                            <div className={classes.profileNoPostsIcon}>
                                <PenIcon size="lg" />
                            </div>
                            <div className={classes.profileNoPostsTitle}>
                                No posts yet
                            </div>
                            <div className={classes.profileNoPostsSubtitle}>
                                User hasn’t posted anything yet
                            </div>
                        </div>
                    </Grid>
                )}
                <Grid item xs={12} className={classes.profileStatusList}>
                    <StatusList
                        statuses={statuses}
                        onFavouriteClick={(statusId, favourited) => (favourited
                            ? favouriteStatus(statusId)
                            : unfavouriteStatus(statusId))}
                        pending={pending}
                        onNextPageRequest={fetchStatuses}
                        onFollowRequest={followStatusAuthor}
                        onUnfollowRequest={unfollowStatusAuthor}
                        displayMenu={Boolean(currentUser)}
                        currentUser={currentUser}
                        statusLikePendingMap={statusLikePendingMap}
                        repostsPendingMap={repostsPendingMap}
                        hasMore={hasMore}
                    />
                </Grid>
            </Grid>
        </>
    );
};

const mapMobxToProps = ({
    userProfileTimeline,
    userProfile,
    authorization,
    createStatus,
}) => ({
    statuses: userProfileTimeline.statuses,
    statusLikePendingMap: userProfileTimeline.statusLikePendingMap,
    favouriteStatus: userProfileTimeline.favouriteStatus,
    unfavouriteStatus: userProfileTimeline.unfavouriteStatus,
    followStatusAuthor: userProfileTimeline.followStatusAuthor,
    unfollowStatusAuthor: userProfileTimeline.unfollowStatusAuthor,
    pending: userProfileTimeline.pending,
    fetchStatuses: userProfileTimeline.fetchStatuses,
    currentUser: authorization.currentUser,
    profileOwnerId: userProfile.user && userProfile.user.id,
    repostsPendingMap: createStatus.pendingRepostsMap,
    hasMore: userProfileTimeline.hasMore,
});

export const UserProfileTimeline = inject(mapMobxToProps)(
    observer(_UserProfileTimeline),
);
