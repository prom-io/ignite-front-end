import React from "react";
import { inject } from "mobx-react";
import { Avatar, Typography, makeStyles } from "@material-ui/core";
import { Link } from "mobx-router";

import { trimString } from "../../utils/string-utils";
import { Routes } from "../../routes";
import { FollowButton } from "./";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";

const useStyles = makeStyles(theme => ({
    followPeopleItem: {
        display: "flex",
        padding: 16,
        border: "1px solid #F1EBE8",
        borderTop: "none",
        textDecoration: "none",

        "&:hover": {
            background: "#FFFBF8"
        }
    },
    followPeopleItemAvatar: {
        marginRight: 12,
        height: 35,
        width: 35
    },
    followPeopleItemContent: {
        width: "100%",

        "& > p": {
            fontWeight: 300,
            fontSize: "13px",
            lineHeight: "16px",
            margin: "4px 0 0",
            color: "#1C1C1C"
        }
    },
    followPeopleItemRow: {
        display: "flex",
        justifyContent: "space-between",

        "& p": {
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",
            textDecoration: "none",
            color: "#1C1C1C"
        },

        "& small": {
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "18px",
            color: "#A2A2A2"
        }
    }
}));

const _FollowPeopleItem = ({ user, actionWithFollow, routerStore }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.followPeopleItem}
            key={user.id}
            view={Routes.userProfile}
            params={{ username: user.id }}
            store={routerStore}
        >
            <Avatar
                className={classes.followPeopleItemAvatar}
                src={
                    user.avatar ||
                    "http://localhost:3000/avatars/original/missing.png"
                }
            />
            <div className={classes.followPeopleItemContent}>
                <div className={classes.followPeopleItemRow}>
                    <Typography>
                        <div>{trimString(user.display_name, 24)}</div>
                        <small>@{trimString(user.username, 24)}</small>
                    </Typography>
                    <ClickEventPropagationStopper>
                        <FollowButton
                            user={user}
                            actionWithFollow={actionWithFollow}
                            size="lg"
                        />
                    </ClickEventPropagationStopper>
                </div>
                <p>{user.bio}</p>
            </div>
        </Link>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store
});

export const FollowPeopleItem = inject(mapMobxToProps)(_FollowPeopleItem);
