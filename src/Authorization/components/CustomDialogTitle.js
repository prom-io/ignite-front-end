import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";

import { CloseIcon } from "../../icons/CloseIcon";
import { AttentionIcon } from "../../icons/AttentionIcon";
import { IgniteIcon } from "../../icons/IgniteIcon";

const useStyles = makeStyles(theme => ({
    titleBlock: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "24px",
        background: "#FFFBF8",
        fontFamily: "Museo Sans Cyrl Bold",
        fontSize: "28px",
        [theme.breakpoints.down("sm")]: {
            padding: "12px",
            fontSize: "24px"
        }
    },
    titleHeader: {
        display: "flex",
        alignItems: "center"
    },
    logoIcon: {
        marginLeft: 32,
        "& svg": {
            marginRight: 28
        },
        "& .header-logo": {
            width: 37,
            height: 61,
            backgroundSize: "100%"
        },
        [theme.breakpoints.down("sm")]: {
            marginLeft: 0
        }
    },
    closeIcon: {
        cursor: "pointer",
        top: "-10px",
        right: "-10px",
        "& svg": {
            stroke: "#A1A1A1"
        }
    },
    colorPrimary: {
        "&:hover": {
            background: "rgba(255, 92, 1, 0.2)"
        }
    },
    titleHeaderText: {
        padding: "12px 0"
    }
}));

export const CustomDialogTitle = ({ title, type, setLoginDialogOpen }) => {
    const classes = useStyles();

    return (
        <div className={classes.titleBlock}>
            <div className={classes.titleHeader}>
                {type === "attention" ? (
                    <a rel="noopener noreferrer" className={classes.logoIcon}>
                        <AttentionIcon />
                    </a>
                ) : (
                    <a rel="noopener noreferrer" className={classes.logoIcon}>
                        <IgniteIcon />
                    </a>
                )}
                <span className={classes.titleHeaderText}>{title}</span>
            </div>
            <IconButton
                aria-label="close"
                color="primary"
                classes={{
                    root: classes.closeIcon,
                    colorPrimary: classes.colorPrimary
                }}
                onClick={() => setLoginDialogOpen(false)}
            >
                <CloseIcon />
            </IconButton>
        </div>
    );
};
