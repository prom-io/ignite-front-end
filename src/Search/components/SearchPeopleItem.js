import React from "react";
import { Link } from "mobx-router";
import { Avatar, Typography, makeStyles } from "@material-ui/core";

import { UserFollowButton } from "../../User/components/UserFollowButton";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";
import { trimString } from "../../utils/string-utils";
import { Routes } from "../../routes";
import { routerStore } from "../../store";

const useStyles = makeStyles(theme => ({
    searchPeopleItem: {
        display: "flex",
        padding: 16,
        border: `1px solid ${theme.palette.border.main}`,
        borderTop: "none",
        textDecoration: "none",

        "&:hover": {
            background: theme.palette.background.light
        }
    },
    searchPeopleItemAvatar: {
        marginRight: 12,
        height: 35,
        width: 35
    },
    searchPeopleItemContent: {
        width: "100%",

        "& > p": {
            fontWeight: 300,
            fontSize: "13px",
            lineHeight: "16px",
            margin: "4px 0 0",
            color: theme.palette.text.main
        }
    },
    searchPeopleItemRow: {
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

export const SearchPeopleItem = ({ user, currentUser, actionWithFollow }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.searchPeopleItem}
            view={Routes.userProfile}
            params={{ username: user.username }}
            store={routerStore}
        >
            <Avatar className={classes.searchPeopleItemAvatar} src={user.avatar} />
            <div className={classes.searchPeopleItemContent}>
                <div className={classes.searchPeopleItemRow}>
                    <Typography>
                        <div>{trimString(user.display_name, 16)}</div>
                        <small>@{trimString(user.username, 16)}</small>
                    </Typography>
                    <ClickEventPropagationStopper>
                        {currentUser && currentUser.username !== user.username && (
                            <UserFollowButton
                                user={user}
                                actionWithFollow={actionWithFollow}
                            />
                        )}
                    </ClickEventPropagationStopper>
                </div>
                <p>{user.bio}</p>
            </div>
        </Link>
    );
};
