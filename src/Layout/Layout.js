import React from "react";
import {Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    layout: {
        marginTop: 16,
        [theme.breakpoints.up("lg")]: {
            paddingLeft: "2.08333333334%",
            paddingRight: "2.08333333334%",
        }
    }
}));

export const Layout = ({children}) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.layout}>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    )
};
