import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    memezatorRulesWrapper: {
        border: `1px solid ${theme.palette.border.main}`,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        padding: "16px"
    }
}));

export const MemezatorRules = () => {
    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.memezatorRulesWrapper}>
            <Typography>Rules</Typography>
        </Grid>
    );
};
