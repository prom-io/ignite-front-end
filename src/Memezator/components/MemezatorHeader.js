import React from "react";
import { observer } from "mobx-react";
import { Button, Typography, makeStyles } from "@material-ui/core";

import { BackButton } from "../../components/BackButton";
import { useLocalization } from "../../store/hooks";

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
                >
                    {l("memezator.results")}
                </Button>
            </div>
            <div className={classes.memezatorCaptionWrapper}>
                <Typography
                    classes={{ root: classes.memezatorCaption }}
                    variant="h5"
                    color="textSecondary"
                >
                    {l("memezator.ignite-memes-totalizator")}
                </Typography>
            </div>
        </>
    );
});
