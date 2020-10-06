import React from "react";
import { observer } from "mobx-react";
import { Link } from "mobx-router";
import { Button, Typography, makeStyles } from "@material-ui/core";

import { BackButton } from "../../components/BackButton";
import { routerStore, useLocalization } from "../../store";
import { Routes } from "../../routes";

const useStyles = makeStyles(theme => ({
    memezatorHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "16px",
        [theme.breakpoints.down("sm")]: {
            position: "fixed",
            top: 0,
            zIndex: 1100,
            background: theme.palette.background.paper,
            marginBottom: 0
        }
    },
    memezatorResultsBtn: {
        height: "34px",
        minWidth: "114px",
        fontWeight: 600,
        lineHeight: "18px",
        fontSize: "15px",
        [theme.breakpoints.down("sm")]: {
            height: "28px",
            minWidth: "84px",
            marginRight: "15px"
        }
    },
    memezatorCaptionWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "16px",
        [theme.breakpoints.down("sm")]: {
            marginBottom: 0,
            padding: "16px 15px"
        }
    },
    memezatorCaption: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "18px",
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
            lineHeight: "14px"
        }
    },
    memezatorCaptionHashtagLink: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline"
        }
    },
    memezatorCaptionHashtag: {
        fontSize: "18px",
        fontWeight: 600,
        [theme.breakpoints.down("sm")]: {
            fontSize: "14px"
        }
    }
}));

export const MemezatorHeader = observer(() => {
    const classes = useStyles();
    const { l } = useLocalization();

    return (
        <>
            <div className={classes.memezatorHeader}>
                <BackButton title="appbar.memezator" toHome />
                <Button
                    classes={{ root: classes.memezatorResultsBtn }}
                    variant="contained"
                    color="primary"
                    onClick={() =>
                        routerStore.router.goTo(Routes.userProfile, {
                            username: "memezator_official"
                        })
                    }
                >
                    {l("memezator.results")}
                </Button>
            </div>
            <div className={classes.memezatorCaptionWrapper}>
                <div>
                    <Typography
                        classes={{ root: classes.memezatorCaption }}
                        variant="h5"
                        color="textSecondary"
                    >
                        {l("memezator.ignite-memes-totalizator")}
                    </Typography>
                </div>
                <div>
                    <Link
                        className={classes.memezatorCaptionHashtagLink}
                        view={Routes.topic}
                        params={{ title: "memezator_talk" }}
                        store={routerStore}
                    >
                        <Typography
                            classes={{ root: classes.memezatorCaptionHashtag }}
                        >
                            #memezator_talk
                        </Typography>
                    </Link>
                </div>
            </div>
        </>
    );
});
