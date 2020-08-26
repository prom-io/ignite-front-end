import React from "react";
import { Link } from "mobx-router";
import { Avatar, Typography, makeStyles } from "@material-ui/core";

import { CommunityJoinButton } from "./CommunityJoinButton";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";
import { routerStore } from "../../store";
import { Routes } from "../../routes";

const useStyles = makeStyles(theme => ({
    communityList: {
        display: "flex",
        padding: 16,
        border: `1px solid ${theme.palette.border.main}`,
        borderTop: "none",
        textDecoration: "none",

        "&:first-child": {
            borderTop: `1px solid ${theme.palette.border.main}`,
            borderRadius: "4px 4px 0 0"
        },

        "&:last-child": {
            borderRadius: "0 0 4px 4px"
        },

        "&:hover": {
            background: theme.palette.background.light
        }
    },
    communityAvatar: {
        marginRight: 12,
        height: 35,
        width: 35
    },
    communityListContent: {
        width: "100%",

        "& > p": {
            fontWeight: 300,
            fontSize: "13px",
            lineHeight: "16px",
            margin: "4px 0 0",
            color: theme.palette.text.main
        }
    },
    communityListRow: {
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
    },
    communityDisplayName: {
        display: "block",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
        [theme.breakpoints.down("sm")]: {
            maxWidth: "140px"
        }
    }
}));

export const CommunityListItem = ({ community, doJoin, currentUser }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.communityList}
            key={community.id}
            view={Routes.community}
            params={{ community: community.username }}
            store={routerStore}
        >
            <Avatar className={classes.communityAvatar} src={community.avatar} />
            <div className={classes.communityListContent}>
                <div className={classes.communityListRow}>
                    <Typography>
                        <div className={classes.communityDisplayName}>
                            {community.display_name}
                        </div>
                        <small className={classes.communityrDisplayName}>
                            @{community.username}
                        </small>
                    </Typography>
                    <ClickEventPropagationStopper>
                        {currentUser && (
                            <CommunityJoinButton
                                community={community}
                                doJoin={doJoin}
                            />
                        )}
                    </ClickEventPropagationStopper>
                </div>
                <Typography>{community.bio}</Typography>
            </div>
        </Link>
    );
};
