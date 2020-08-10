import React from "react";
import { Link } from "mobx-router";
import { Avatar, Typography, makeStyles } from "@material-ui/core";

import { Routes } from "../../routes";
import { routerStore } from "../../store";
import { trimString } from "../../utils/string-utils";

const useStyles = makeStyles(theme => ({
    postLink: {
        display: "flex",
        padding: "16px",
        textDecoration: "none",

        "&:hover": {
            background: theme.palette.background.light
        }
    },
    searchItemAvatar: {
        marginRight: 12,
        height: 35,
        width: 35
    },
    searchItemContent: {
        width: "100%",

        "& > p": {
            fontWeight: 300,
            fontSize: "13px",
            lineHeight: "16px",
            margin: "4px 0 0",
            color: theme.palette.text.main
        }
    },
    searchItemRow: {
        display: "flex",
        justifyContent: "space-between",

        "& p": {
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",
            textDecoration: "none",
            color: theme.palette.text.main
        },

        "& small": {
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "18px",
            color: theme.palette.text.secondary
        }
    }
}));

export const SearchResultDropdownItem = ({ user }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.postLink}
            view={Routes.userProfile}
            params={{ username: user.username }}
            store={routerStore}
        >
            <Avatar className={classes.searchItemAvatar} src={user.avatar} />
            <div className={classes.searchItemContent}>
                <div className={classes.searchItemRow}>
                    <Typography>
                        <div>{trimString(user.display_name, 16)}</div>
                        <small>@{trimString(user.username, 16)}</small>
                    </Typography>
                </div>
            </div>
        </Link>
    );
};
