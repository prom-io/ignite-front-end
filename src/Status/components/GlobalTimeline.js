import React from "react";
import {inject, observer} from "mobx-react";
import {CircularProgress, makeStyles, Grid} from "@material-ui/core";
import {StatusList} from "./StatusList";
import {CreateStatusForm} from "./CreateStatusForm";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    paddingCorective: {
        paddingBottom: "0 !important" 
    },
    statusListBorderCorrective: {
        paddingTop: "0 !important",
    }
}));

const _GlobalTimeline = ({
    statuses,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    unfollowStatusAuthor,
    fetchStatuses,
    pending,
    currentUser
}) => {
    const classes = useStyles();

    return pending && statuses.length === 0
        ? <CircularProgress size={40} className={classes.centered}/>
        : (
            <Grid container spacing={2}>
                {currentUser && (
                    <Grid item xs={12} className={classes.paddingCorective}>
                        <CreateStatusForm/>
                    </Grid>
                )}
                <Grid item xs={12} className={classes.statusListBorderCorrective}>
                    <StatusList statuses={statuses}
                                onFavouriteClick={(statusId, favourited) => favourited ? favouriteStatus(statusId) : unfavouriteStatus(statusId)}
                                pending={pending}
                                onNextPageRequest={fetchStatuses}
                                onUnfollowRequest={followStatusAuthor}
                                onFollowRequest={unfollowStatusAuthor}
                                displayMenu={Boolean(currentUser)}
                                currentUser={currentUser}
                    />
                </Grid>
            </Grid>
        );
};

const mapMobxToProps = ({globalTimeline, authorization}) => ({
    statuses: globalTimeline.statuses,
    favouriteStatus: globalTimeline.favouriteStatus,
    unfavouriteStatus: globalTimeline.unfavouriteStatus,
    followStatusAuthor: globalTimeline.followStatusAuthor,
    unfollowStatusAuthir: globalTimeline.unfollowStatusAuthor,
    pending: globalTimeline.pending,
    fetchStatuses: globalTimeline.fetchStatuses,
    currentUser: authorization.currentUser
});

export const GlobalTimeline = inject(mapMobxToProps)(observer(_GlobalTimeline));
