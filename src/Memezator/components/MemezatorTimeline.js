import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles, Hidden, Grid } from "@material-ui/core";

import { MemezatorRules } from "./";
import { CreateStatusForm, StatusList } from "../../Status/components";
import { UnfollowDialog } from "../../Follow/components";
import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "150px",
        display: "table"
    },
    statusListBorderCorrective: {
        padding: "0 !important",
        width: "100%",
        [theme.breakpoints.down("md")]: {
            padding: "0px !important",
            paddingBottom: `${theme.spacing(1)}px !important`
        }
    }
}));

const _MemezatorTimeline = ({
    currentUser,
    statuses,
    statusLikePendingMap,
    repostsPendingMap,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    unfollowStatusAuthorWithDialog,
    fetchStatuses,
    pending,
    hasMore,
    currentStatusUsername,
    unfollowStatusAuthor,
    setUnfollowDialogOpen,
    unfollowDialogOpen
}) => {
    const classes = useStyles();

    return pending && statuses.length === 0 ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : (
        <Grid container>
            <MemezatorRules />
            {currentUser && (
                <Grid item xs={12} className="create_status_form_mobile">
                    <Hidden smDown>
                        <CreateStatusForm />
                    </Hidden>
                </Grid>
            )}
            <Grid item item className={classes.statusListBorderCorrective}>
                <StatusList
                    statuses={statuses}
                    onFavouriteClick={(statusId, favourited) =>
                        favourited
                            ? favouriteStatus(statusId)
                            : unfavouriteStatus(statusId)
                    }
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

const mapMobxToProps = ({ authorization, homeTimeline, createStatus }) => ({
    currentUser: authorization.currentUser,
    statuses: homeTimeline.statuses,
    statusLikePendingMap: homeTimeline.statusLikePendingMap,
    favouriteStatus: homeTimeline.favouriteStatus,
    unfavouriteStatus: homeTimeline.unfavouriteStatus,
    followStatusAuthor: homeTimeline.followStatusAuthor,
    unfollowStatusAuthorWithDialog: homeTimeline.unfollowStatusAuthorWithDialog,
    pending: homeTimeline.pending,
    fetchStatuses: homeTimeline.fetchStatuses,
    repostsPendingMap: createStatus.pendingRepostsMap,
    hasMore: homeTimeline.hasMore,
    currentStatusUsername: homeTimeline.currentStatusUsername,
    unfollowStatusAuthor: homeTimeline.unfollowStatusAuthor,
    setUnfollowDialogOpen: homeTimeline.setUnfollowDialogOpen,
    unfollowDialogOpen: homeTimeline.unfollowDialogOpen
});

export const MemezatorTimeline = inject(mapMobxToProps)(
    observer(_MemezatorTimeline)
);
