import React from "react";
import {inject, observer} from "mobx-react";
import {CircularProgress, makeStyles, Grid} from "@material-ui/core";
import {StatusList} from "./StatusList";
import {CreateStatusForm} from "./CreateStatusForm";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    gridItemOverridePadding: {
        [theme.breakpoints.down("md")]: {
            padding: "0px !important"
        }
    },
    gridItemBottomSpacing: {
        [theme.breakpoints.down("md")]: {
            padding: "0px !important",
            paddingBottom: `${theme.spacing(1)}px !important`
        }
    }
}));

const _HomeTimeline= ({
    statuses,
    statusLikePendingMap,
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
        ? <CircularProgress size={20} className={classes.centered}/>
        : (
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.gridItemBottomSpacing}>
                    <CreateStatusForm/>
                </Grid>
                <Grid item xs={12} className={classes.gridItemOverridePadding}>
                    <StatusList statuses={statuses}
                                onFavouriteClick={(statusId, favourited) => favourited ? favouriteStatus(statusId) : unfavouriteStatus(statusId)}
                                pending={pending}
                                onNextPageRequest={fetchStatuses}
                                onFollowRequest={followStatusAuthor}
                                onUnfollowRequest={unfollowStatusAuthor}
                                currentUser={currentUser}
                                displayMenu={Boolean(currentUser)}
                                statusLikePendingMap={statusLikePendingMap}
                    />
                </Grid>
            </Grid>
        )
};

const mapMobxToProps = ({homeTimeline, authorization}) => ({
    statuses: homeTimeline.statuses,
    statusLikePendingMap: homeTimeline.statusLikePendingMap,
    favouriteStatus: homeTimeline.favouriteStatus,
    unfavouriteStatus: homeTimeline.unfavouriteStatus,
    followStatusAuthor: homeTimeline.followStatusAuthor,
    unfollowStatusAuthor: homeTimeline.unfollowStatusAuthor,
    pending: homeTimeline.pending,
    fetchStatuses: homeTimeline.fetchStatuses,
    currentUser: authorization.currentUser
});

export const HomeTimeline= inject(mapMobxToProps)(observer(_HomeTimeline));
