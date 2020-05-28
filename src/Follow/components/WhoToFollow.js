import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import { Grid, makeStyles } from "@material-ui/core";

import { Routes } from "../../routes";
import { localized } from "../../localization/components";
import { WhoToFollowList } from "./WhoToFollowList";

const useStyles = makeStyles(theme => ({
    whoToFollow: {
        border: "1px solid #F1EBE8",
        background: "#FBF7F6",
        borderRadius: "4px"
    },
    whoToFollowHeader: {
        borderBottom: "1px solid #F1EBE8",

        "& h3": {
            padding: "16px",
            margin: "0",
            fontFamily: "Museo Sans Cyrl Bold",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24px",
            color: "#1C1C1C"
        }
    },
    whoToFollowBody: {},
    whoToFollowFooter: {
        padding: "16px",
        margin: "0",

        "& a": {
            fontFamily: "Museo Sans Cyrl Regular",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "15px",
            color: theme.palette.primary.main,

            "&:hover": {
                textDecoration: "none"
            }
        }
    }
}));

const _WhoToFollow = ({ routerStore, l }) => {
    const classes = useStyles();

    return (
        <Grid container spacing={2} className="description-container-right">
            <Grid className="user_profile_container">
                <div className={classes.whoToFollow}>
                    <div className={classes.whoToFollowHeader}>
                        <h3>{l("user.card.who-to-follow")}</h3>
                    </div>
                    <div className={classes.whoToFollowBody}>
                        <WhoToFollowList />
                    </div>
                    <div className={classes.whoToFollowFooter}>
                        <Link view={Routes.followPeople} store={routerStore}>
                            {l("user.card.show-more")}
                        </Link>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store
});

export const WhoToFollow = localized(inject(mapMobxToProps)(_WhoToFollow));
