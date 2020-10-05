import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";

import { AppBar } from "../AppBar/components";
import { localized } from "../localization/components";
import { Routes } from "../routes";
import { routerStore } from "../store";

const useStyles = makeStyles(theme => ({
    notFound: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
    },
    comingSoon: {
        fontFamily: "Museo Sans Cyrl Bold",
        fontSize: "80px",
        textTransform: "uppercase",
        [theme.breakpoints.down("340")]: {
            fontSize: "68px"
        }
    },
    notFoundMainText: {
        fontFamily: "Museo Sans Cyrl Bold",
        fontSize: "20px",
        maxWidth: "600px",
        margin: "20px 0 15px"
    },
    notFoundSecondaryText: {
        fontSize: "15px",
        lineHeight: "26px",
        maxWidth: "400px",
        margin: "0 auto 24px"
    }
}));

export const _MemezatorNotFoundPage = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar currentActiveRoute="memezator" />
            <div className={classes.notFound}>
                <Typography variant="h1" className={classes.comingSoon}>
                    Coming Soon
                </Typography>
                <Typography className={classes.notFoundMainText} color="textPrimary">
                    Memezator is going on planned maintenance before Memezator 2.0
                    release.
                </Typography>
                <Typography
                    className={classes.notFoundSecondaryText}
                    color="textSecondary"
                >
                    It will be unavailable until 8th of October. We will publish a
                    detailed article on Memezator 2.0 and FAQ later today. Thank you
                    for your patience and support!
                </Typography>
                <Button
                    onClick={() => routerStore.router.goTo(Routes.home)}
                    variant="outlined"
                    color="primary"
                    disableElevation
                >
                    Go Back Home
                </Button>
            </div>
        </>
    );
};

export const MemezatorNotFoundPage = localized(_MemezatorNotFoundPage);
