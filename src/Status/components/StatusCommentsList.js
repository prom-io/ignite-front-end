import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import { StatusList } from './StatusList';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
}));

const _StatusCommentsList = ({
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
    hasMore,
    l,
}) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">
                    {l('status.comments')}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {pending && statuses.length === 0 && <CircularProgress size={20} className={classes.centered} />}
            </Grid>
            <Grid item xs={12}>
                {statuses.length === 0 && !pending && <Typography color="textSecondary">{l('status.no-comments')}</Typography>}
                <StatusList
                    statuses={statuses}
                    onFavouriteClick={(statusId, favourited) => (favourited ? favouriteStatus(statusId) : unfavouriteStatus(statusId))}
                    pending={pending}
                    onNextPageRequest={fetchStatuses}
                    onFollowRequest={followStatusAuthor}
                    onUnfollowRequest={unfollowStatusAuthor}
                    currentUser={currentUser}
                    displayMenu={Boolean(currentUser)}
                    statusLikePendingMap={statusLikePendingMap}
                    repostsPendingMap={repostsPendingMap}
                    hideThreadLinks
                    hasMore={hasMore}
                />
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ statusComments, authorization, createStatus }) => ({
    statuses: statusComments.statuses,
    statusLikePendingMap: statusComments.statusLikePendingMap,
    favouriteStatus: statusComments.favouriteStatus,
    unfavouriteStatus: statusComments.unfavouriteStatus,
    followStatusAuthor: statusComments.followStatusAuthor,
    unfollowStatusAuthor: statusComments.unfollowStatusAuthor,
    pending: statusComments.pending,
    fetchStatuses: statusComments.fetchStatuses,
    currentUser: authorization.currentUser,
    repostsPendingMap: createStatus.pendingRepostsMap,
    hasMore: statusComments.hasMore,
});

export const StatusCommentsList = localized(
    inject(mapMobxToProps)(observer(_StatusCommentsList)),
);
