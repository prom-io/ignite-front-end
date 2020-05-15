import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, makeStyles, Grid } from '@material-ui/core';
import { StatusList } from './StatusList';
import { CreateStatusForm } from './CreateStatusForm';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    paddingCorective: {
        paddingBottom: '0 !important',
        [theme.breakpoints.down('md')]: {
            padding: '0px !important',
            paddingBottom: `${theme.spacing(1)}px !important`,
        },
    },
    statusListBorderCorrective: {
        paddingTop: '0 !important',
        [theme.breakpoints.down('md')]: {
            padding: '0px !important',
            paddingBottom: `${theme.spacing(1)}px !important`,
        },
    },
}));

const _GlobalTimeline = ({
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
}) => {
    const classes = useStyles();

    return pending && statuses.length === 0
        ? <CircularProgress size={40} className={classes.centered} />
        : (
            <Grid container spacing={2}>
                {currentUser && (
                    <Grid item xs={12} className={classes.paddingCorective}>
                        <CreateStatusForm />
                    </Grid>
                )}
                <Grid item xs={12} className={classes.statusListBorderCorrective}>
                    <StatusList
                        statuses={statuses}
                        onFavouriteClick={(statusId, favourited) => (favourited ? favouriteStatus(statusId) : unfavouriteStatus(statusId))}
                        pending={pending}
                        onNextPageRequest={fetchStatuses}
                        onUnfollowRequest={unfollowStatusAuthor}
                        onFollowRequest={followStatusAuthor}
                        displayMenu={Boolean(currentUser)}
                        currentUser={currentUser}
                        statusLikePendingMap={statusLikePendingMap}
                        repostsPendingMap={repostsPendingMap}
                    />
                </Grid>
            </Grid>
        );
};

const mapMobxToProps = ({ globalTimeline, authorization, createStatus }) => ({
    statuses: globalTimeline.statuses,
    statusLikePendingMap: globalTimeline.statusLikePendingMap,
    favouriteStatus: globalTimeline.favouriteStatus,
    unfavouriteStatus: globalTimeline.unfavouriteStatus,
    followStatusAuthor: globalTimeline.followStatusAuthor,
    unfollowStatusAuthor: globalTimeline.unfollowStatusAuthor,
    pending: globalTimeline.pending,
    fetchStatuses: globalTimeline.fetchStatuses,
    currentUser: authorization.currentUser,
    repostsPendingMap: createStatus.pendingRepostsMap,
});

export const GlobalTimeline = inject(mapMobxToProps)(observer(_GlobalTimeline));
