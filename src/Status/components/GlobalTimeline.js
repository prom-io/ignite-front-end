import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles, Hidden, Grid } from '@material-ui/core';
import { StatusList } from './StatusList';
import { CreateStatusForm } from './CreateStatusForm';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '150px',
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
        padding: '0 !important',
        width: '100%',
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
    hasMore,
}) => {
    const classes = useStyles();

    return pending && statuses.length === 0
        ? <div className={classes.centered}><Loader size="lg" /></div>
        : (
            <Grid container>
                {currentUser && (
                    <Grid item xs={12} className={classes.paddingCorective}>
                        <Hidden smDown>
                            <CreateStatusForm />
                        </Hidden>
                    </Grid>
                )}
                <Grid item className={classes.statusListBorderCorrective}>
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
                        hasMore={hasMore}
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
    hasMore: globalTimeline.hasMore,
});

export const GlobalTimeline = inject(mapMobxToProps)(observer(_GlobalTimeline));
