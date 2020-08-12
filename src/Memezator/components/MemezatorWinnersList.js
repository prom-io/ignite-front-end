import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import { Avatar, Typography, makeStyles } from "@material-ui/core";

import Loader from "../../components/Loader";
import { Routes } from "../../routes";
import { trimString } from "../../utils/string-utils";
import { routerStore } from "../../store";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        display: "table"
    },
    recentWinnersItem: {
        padding: "12px 16px",
        borderBottom: `1px solid ${theme.palette.border.main}`,
        display: "flex",

        "& a": {
            display: "inline-block"
        }
    },
    recentWinnersItemAvatar: {
        width: "24px",
        height: "24px",
        borderBottom: `1px solid ${theme.palette.border.main}`
    },
    recentWinnersItemContent: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
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
        color: theme.palette.text.secondary
    },
    notFound: {
        padding: "16px"
    }
}));

const _MemezatorWinnersList = ({ recentWinners, pending }) => {
    const classes = useStyles();

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
            <div className={classes.recentWinnersItem} key={user.id}>
                <Link
                    view={Routes.userProfile}
                    params={{ username: user.username }}
                    store={routerStore}
                >
                    <Avatar
                        className={classes.recentWinnersItemAvatar}
                        src={user.avatar}
                    />
                </Link>
                <div className={classes.recentWinnersItemContent}>
                    <div>
                        <Link
                            view={Routes.userProfile}
                            params={{ username: user.username }}
                            store={routerStore}
                            style={{ textDecoration: "none" }}
                        >
                            <Typography
                                variant="h3"
                                classes={{ root: classes.itemDisplayName }}
                            >
                                {trimString(user.display_name, 24)}
                            </Typography>
                        </Link>
                        <Typography classes={{ root: classes.itemUsername }}>
                            @{trimString(user.username, 24)}
                        </Typography>
                    </div>
                    <div>
                        <Typography variant="h5">{user.points}</Typography>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <div className={classes.notFound}>
            <Typography>Not Found</Typography>
        </div>
    );
};

const mapMobxToProps = ({ memezatorWinners }) => ({
    recentWinners: memezatorWinners.recentWinners,
    pending: memezatorWinners.pending
});

export const MemezatorWinnersList = inject(mapMobxToProps)(
    observer(_MemezatorWinnersList)
);
