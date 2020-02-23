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
    }
}));

const _GlobalTimeline = ({
    statuses,
    favouriteStatus,
    unfavouriteStatus,
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
                    <Grid item xs={12}>
                        <CreateStatusForm/>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <StatusList statuses={statuses}
                                onFavouriteClick={(statusId, favourited) => favourited ? favouriteStatus(statusId) : unfavouriteStatus(statusId)}
                                pending={pending}
                                onNextPageRequest={fetchStatuses}
                    />
                </Grid>
            </Grid>
        );
};

const mapMobxToProps = ({globalTimeline, authorization}) => ({
    statuses: globalTimeline.statuses,
    favouriteStatus: globalTimeline.favouriteStatus,
    unfavouriteStatus: globalTimeline.unfavouriteStatus,
    pending: globalTimeline.pending,
    fetchStatuses: globalTimeline.fetchStatuses,
    currentUser: authorization.currentUser
});

export const GlobalTimeline = inject(mapMobxToProps)(observer(_GlobalTimeline));
