import React from "react";
import { inject, observer } from "mobx-react";
import { Card, makeStyles } from "@material-ui/core";

import { UsersList } from "./UsersList";
import { UserEmptyList } from "./UserEmptyList";
import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "150px",
        display: "table"
    },
    cardContainer: {
        boxShadow: "none",
        border: `1px solid ${theme.palette.border.main}`
    }
}));

const _UserFollowersList = ({ followers, pending }) => {
    const classes = useStyles();

    return pending ? (
        <div className={classes.centered}>
            <Loader size="lg" />
        </div>
    ) : followers.length ? (
        <Card className={classes.cardContainer}>
            <UsersList users={followers} />
        </Card>
    ) : (
        <UserEmptyList emptyTag="followers" />
    );
};

const mapMobxToProps = ({ userFollowers }) => ({
    pending: userFollowers.pending,
    followers: userFollowers.followers
});

export const UserFollowersList = inject(mapMobxToProps)(
    observer(_UserFollowersList)
);
