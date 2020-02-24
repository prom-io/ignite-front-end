import React from "react";
import {AppBar as MuiAppBar, makeStyles, Typography} from "@material-ui/core";
import {Link} from "mobx-router";
import {BlockIcon} from "../../icons/BlockIcon";

const useStyles = makeStyles(theme => ({
    appBarLink: {
        textDecoration: "none",
        display: "flex",
        color: theme.palette.text.primary
    },
    appBarLinkActive: {
        textDecoration: "none",
        display: "flex",
        color: theme.palette.primary.main
    },
    appBarLinkTextContainer: {
        display: "flex",
        alignItems: "center"
    }
}));

export const AppBarLink = ({routerStore, targetView, viewParameters, active, icon, text}) => {
    const classes = useStyles();

    return (
        <Link className={active ? classes.appBarLinkActive : classes.appBarLink}
              store={routerStore}
              view={targetView}
              params={viewParameters}
        >
            <div color="inherit" className={classes.appBarLinkTextContainer}>
                {icon}
                <Typography variant="body1">
                    {text}
                </Typography>
            </div>
        </Link>
    )
};
