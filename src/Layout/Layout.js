import React from "react";
import {Grid, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    layout: {
        paddingLeft: "2.08333333334%",
        paddingRight: "2.08333333334%",
        marginTop: 16
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
