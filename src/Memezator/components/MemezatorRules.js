import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    memezatorRulesWrapper: {
      border: `1px solid ${theme.palette.border.main}`,
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      padding: "16px",
      marginBottom: 20,
    }
}));

export const MemezatorRules = () => {
    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.memezatorRulesWrapper}>
            <Typography variant={'h5'}>
                Rules
            </Typography>
            <Typography>
                With the start of the contest, each Ignite user can publish 1 post to participate in the Contest. You can publish a post either in the Memezator interface or in your feed by specifying a special hashtag.
            </Typography>
            <Typography>
                After publication-all users of the system can vote for a post that they think deserves to win (no more than 3 votes per day)
            </Typography>
            <Typography>
                The votes are counted at 00: 00 the next day (each round of the contest lasts exactly 24 hours)
            </Typography>
            <Typography>
                At the end of the stage, the votes are counted and the winners are published
            </Typography>
            <Typography variant={'h5'}>
                To participate:
            </Typography>
            <Typography>1. The user must be registered in the Ignite system</Typography>
            <Typography>2. The user must have a meaningful username + userpic</Typography>
            <Typography>3. The user must either have a balance on their PROM wallet, OR have published a meaningful post in the last 24 hours.</Typography>
        </Grid>
    );
};
