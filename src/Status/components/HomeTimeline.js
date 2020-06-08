import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, makeStyles, Grid } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';
import { StatusList } from './StatusList';
import { CreateStatusForm } from './CreateStatusForm';
import { UnfollowDialog } from '../../Follow/components';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50px',
        display: 'table',
    },
    gridItemOverridePadding: {
        [theme.breakpoints.down('md')]: {
            padding: '0px !important',
        },
    },
    gridItemBottomSpacing: {
        [theme.breakpoints.down('md')]: {
            padding: '0px !important',
            paddingBottom: `${theme.spacing(1)}px !important`,
        },
    },
}));

const _HomeTimeline = ({
    statuses,
    statusLikePendingMap,
    repostsPendingMap,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    unfollowStatusAuthorWithDialog,
    fetchStatuses,
    pending,
    currentUser,
    hasMore,
    currentStatusUsername,
    unfollowStatusAuthor,
    setUnfollowDialogOpen,
    unfollowDialogOpen,
}) => {
    const classes = useStyles();
    const theme = useTheme();

    return pending && statuses.length === 0
        ? <div className={classes.centered}><FadeLoader color={theme.palette.primary.main}  css="transform: scale(0.5)" /></div>
        : (
            <Grid container>
                <Grid item xs={12} className={classes.gridItemBottomSpacing} className="create_status_form_mobile">
                    <CreateStatusForm />
                </Grid>
                <Grid item xs={12} className={classes.gridItemOverridePadding}>
                    <StatusList
                        statuses={statuses}
                        onFavouriteClick={(statusId, favourited) => (favourited ? favouriteStatus(statusId) : unfavouriteStatus(statusId))}
                        pending={pending}
                        onNextPageRequest={fetchStatuses}
                        onFollowRequest={followStatusAuthor}
                        onUnfollowRequest={unfollowStatusAuthorWithDialog}
                        currentUser={currentUser}
                        displayMenu={Boolean(currentUser)}
                        statusLikePendingMap={statusLikePendingMap}
                        repostsPendingMap={repostsPendingMap}
                        hasMore={hasMore}
                    />
                    <UnfollowDialog
                        username={currentStatusUsername}
                        unfollowAction={unfollowStatusAuthor}
                        unfollowDialogOpen={unfollowDialogOpen}
                        setUnfollowDialogOpen={setUnfollowDialogOpen}
                    />
                </Grid>
            </Grid>
        );
};

const mapMobxToProps = ({ homeTimeline, authorization, createStatus }) => ({
    statuses: homeTimeline.statuses,
    statusLikePendingMap: homeTimeline.statusLikePendingMap,
    favouriteStatus: homeTimeline.favouriteStatus,
    unfavouriteStatus: homeTimeline.unfavouriteStatus,
    followStatusAuthor: homeTimeline.followStatusAuthor,
    unfollowStatusAuthorWithDialog: homeTimeline.unfollowStatusAuthorWithDialog,
    pending: homeTimeline.pending,
    fetchStatuses: homeTimeline.fetchStatuses,
    currentUser: authorization.currentUser,
    repostsPendingMap: createStatus.pendingRepostsMap,
    hasMore: homeTimeline.hasMore,
    currentStatusUsername: homeTimeline.currentStatusUsername,
    unfollowStatusAuthor: homeTimeline.unfollowStatusAuthor,
    setUnfollowDialogOpen: homeTimeline.setUnfollowDialogOpen,
    unfollowDialogOpen: homeTimeline.unfollowDialogOpen,
});

export const HomeTimeline = inject(mapMobxToProps)(observer(_HomeTimeline));
