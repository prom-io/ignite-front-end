import React from "react";
import { inject, observer } from "mobx-react";
import { Button, makeStyles } from "@material-ui/core";

import { IgniteIcon } from "../../icons/IgniteIcon";

const useStyles = makeStyles(() => ({
    btnLogo: {
        padding: 0,
        minWidth: "unset",
        marginRight: "28px",
        width: "32px",
        "&:hover": {
            backgroundColor: "unset"
        }
    }
}));

const _AppBarLogo = ({ timelineSwitcher, notifications }) => {
    const classes = useStyles();

    const handleClickOnLogo = () => {
        const path = window.location.pathname;
        if (path === "/") {
            timelineSwitcher.selectedTimeline.reset();
            timelineSwitcher.selectedTimeline.fetchStatuses();
        } else if (path === "/notifications") {
            notifications.reset();
            notifications.fetchNotifications();
        }
    };

    return (
        <Button
            className={classes.btnLogo}
            onClick={handleClickOnLogo}
            disableTouchRipple
        >
            <IgniteIcon />
        </Button>
    );
};

const mapMobxToProps = ({ timelineSwitcher, notifications }) => ({
    timelineSwitcher,
    notifications
});

export const AppBarLogo = inject(mapMobxToProps)(observer(_AppBarLogo));
