import React from "react";
import {makeStyles, Typography, SvgIcon} from "@material-ui/core";
import {Link} from "mobx-router";

const useStyles = makeStyles(theme => ({
    appBarLink: {
        textDecoration: "none",
        display: "flex",
        color: theme.palette.text.primary,
        marginRight: "20px"
    },
    appBarLinkActive: {
        textDecoration: "none",
        display: "flex",
        color: theme.palette.primary.main,
        marginRight: "20px"
    },
    appBarLinkTextContainer: {
        display: "flex",
        alignItems: "center"
    }
}));

export const AppBarLink = ({routerStore, targetView, viewParameters, active, icon, text, id}) => {
    const classes = useStyles();

    return (
        <Link className={active ? classes.appBarLinkActive : classes.appBarLink}
              store={routerStore}
              view={targetView}
              params={viewParameters}
        >
            <div color="inherit"
                 className={classes.appBarLinkTextContainer}
                 id={id}
            >
                {icon}
                <Typography variant="body1" style={{ paddingLeft: "8px" }} className="nav-bar-link">
                    <strong>{text}</strong>
                </Typography>
            </div>
        </Link>
    )
};
