import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import { ArrowBackIcon } from "../icons/ArrowBackIcon";
import { localized } from "../localization/components";

const useStyles = makeStyles(() => ({
    backButtonWrapper: {
        display: "flex",
        alignItems: "center"
    },
    backButton: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        height: "32px",
        width: "32px",
        marginRight: "4px",

        "&:hover": {
            background: "rgba(255, 92, 1, 0.2)",
            borderRadius: "30px"
        }
    },
    backButtonTitle: {
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        margin: 0
    }
}));

const _BackButton = ({ title, l }) => {
    const classes = useStyles();

    return (
        <div className={classes.backButtonWrapper}>
            <div
                onClick={() => window.history.back()}
                className={classes.backButton}
            >
                <ArrowBackIcon />
            </div>
            <Typography>
                <h2 className={classes.backButtonTitle}>{l(title)}</h2>
            </Typography>
        </div>
    );
};

export const BackButton = localized(_BackButton);
