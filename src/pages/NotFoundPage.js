import React from "react";
import { Button, Typography, makeStyles } from "@material-ui/core";

import { AppBar } from "../AppBar/components";
import { localized } from "../localization/components";
import { Routes } from "../routes";
import { routerStore } from "../store";
import errorImage from "../images/page_not_found.jpg";

const useStyles = makeStyles(theme => ({
    notFound: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center"
    },
    notFoundImageWrapper: {
        minWidth: "290px",
        "& img": {
            width: "100%"
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
    },
    notFoundButton: {
        maxWidth: "187px",
        width: "100%",
        height: "40px",
        fontWeight: "bold",
        [theme.breakpoints.down("xs")]: {
            maxWidth: "115px"
        }
    }
}));

export const _NotFoundPage = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar />
            <div className={classes.notFound}>
                <div className={classes.notFoundImageWrapper}>
                    <img src={errorImage} alt="" />
                </div>
                <Typography className={classes.notFoundMainText} color="textPrimary">
                    Oops! It looks like we don’t have such a page
                </Typography>
                <Typography
                    className={classes.notFoundSecondaryText}
                    color="textSecondary"
                >
                    Are you sure the web site URL is correct? Get in touch with
                    support
                </Typography>
                <Button
                    classes={{ root: classes.notFoundButton }}
                    onClick={() => routerStore.router.goTo(Routes.home)}
                    variant="contained"
                    color="primary"
                >
                    Go Back Home
                </Button>
            </div>
        </>
    );
};

export const NotFoundPage = localized(_NotFoundPage);
