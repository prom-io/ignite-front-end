import React from "react";
import { observer } from "mobx-react";
import { Link } from "mobx-router";
import { Avatar, Typography, Button, makeStyles } from "@material-ui/core";

import Loader from "../../components/Loader";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";
import { trimString } from "../../utils/string-utils";
import { Routes } from "../../routes";
import { routerStore, useLocalization } from "../../store";
import { HeartOutlinedIcon } from "../../icons/HeartOutlinedIcon";
import { TrophyIcon } from "../../icons/TrophyIcon";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        display: "table"
    },
    recentWinnersItem: {
        textDecoration: "none",
        padding: "12px 16px",
        borderBottom: `1px solid ${theme.palette.border.main}`,
        display: "flex",
        "&:hover": {
            background: theme.palette.background.light
        }
    },
    recentWinnersItemAvatar: {
        width: "24px",
        height: "24px",
        borderBottom: `1px solid ${theme.palette.border.main}`
    },
    recentWinnersItemContent: {
        paddingLeft: "8px"
    },
    itemDisplayName: {
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "18px",
        margin: "0 0 4px 0",
        color: theme.palette.text.main
    },
    itemUsername: {
        display: "block",
        fontWeight: 300,
        fontSize: "12px",
        lineHeight: "14px",
        color: theme.palette.text.secondary,
        marginBottom: "13px"
    },
    recentWinnersItemStatsWrapper: {
        display: "flex",
        marginBottom: "13px",
        "& > div": {
            display: "flex",
            alignItems: "center",
            "&:first-child": {
                marginRight: "28px"
            }
        }
    },
    recentWinnersItemStats: {
        marginLeft: "8px",
        color: "#A2A2A2",
        fontSize: "15px"
    },
    recentWinnersShowPostBtn: {
        height: "24px",
        fontSize: "12px",
        lineHeight: "14px",
        [theme.breakpoints.down("sm")]: {
            minWidth: "95px",
            height: "28px"
        }
    },
    notFound: {
        padding: "16px"
    }
}));

export const MemezatorWinnersList = observer(({ recentWinners, pending }) => {
    const classes = useStyles();
    const { l } = useLocalization();

    if (pending) {
        return (
            <div className={classes.centered}>
                <Loader
                    size="md"
                    css="transform: scale(0.5); top: 10px; left: 10px"
                />
            </div>
        );
    }

    return recentWinners.length > 0 ? (
        recentWinners.map(user => (
            <Link
                key={user.id}
                className={classes.recentWinnersItem}
                view={Routes.userProfile}
                params={{ username: user.username }}
                store={routerStore}
            >
                <Avatar
                    className={classes.recentWinnersItemAvatar}
                    src={user.avatar}
                />
                <div className={classes.recentWinnersItemContent}>
                    <Typography
                        variant="h3"
                        classes={{ root: classes.itemDisplayName }}
                    >
                        {trimString(user.display_name, 24)}
                    </Typography>
                    <Typography classes={{ root: classes.itemUsername }}>
                        @{trimString(user.username, 24)}
                    </Typography>
                    <div className={classes.recentWinnersItemStatsWrapper}>
                        <div>
                            <HeartOutlinedIcon />
                            <Typography
                                classes={{ root: classes.recentWinnersItemStats }}
                            >
                                {user.likes}
                            </Typography>
                        </div>
                        <div>
                            <TrophyIcon />
                            <Typography
                                classes={{ root: classes.recentWinnersItemStats }}
                            >
                                {user.trophies}
                            </Typography>
                        </div>
                    </div>
                    <ClickEventPropagationStopper>
                        <Button
                            classes={{ root: classes.recentWinnersShowPostBtn }}
                            color="primary"
                            variant="outlined"
                        >
                            {l("memezator.card.show-post")}
                        </Button>
                    </ClickEventPropagationStopper>
                </div>
            </Link>
        ))
    ) : (
        <div className={classes.notFound}>
            <Typography>Not Found</Typography>
        </div>
    );
});
