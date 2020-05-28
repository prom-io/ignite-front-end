import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { CircularProgress, makeStyles } from "@material-ui/core";

import { SideBarList } from "./";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    }
}));

const _WhoToFollowList = ({
    fetchWhoToFollow,
    whoToFollowItems,
    followWithButton,
    pending
}) => {
    const classes = useStyles();

    useEffect(() => {
        fetchWhoToFollow();
    }, []);

    return whoToFollowItems.slice(0, 5).length === 0 && pending ? (
        <CircularProgress size={15} className={classes.centered} />
    ) : (
        <SideBarList
            users={whoToFollowItems.slice(0, 5)}
            followWithButton={followWithButton}
        />
    );
};

const mapMobxToProps = ({ whoToFollow }) => ({
    fetchWhoToFollow: whoToFollow.fetchWhoToFollow,
    whoToFollowItems: whoToFollow.whoToFollowItems,
    followWithButton: whoToFollow.followWithButton,
    pending: whoToFollow.pending
});

export const WhoToFollowList = inject(mapMobxToProps)(observer(_WhoToFollowList));
