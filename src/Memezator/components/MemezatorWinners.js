import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

import { MemezatorWinnersList } from "./";
import { useLocalization } from "../../store/hooks";

const useStyles = makeStyles(theme => ({
    memezatorRecentWinners: {
        border: `1px solid ${theme.palette.border.main}`,
        background: theme.palette.background.light,
        borderRadius: "4px"
    },
    memezatorRecentWinnersHeader: {
        borderBottom: `1px solid ${theme.palette.border.main}`,

        "& h3": {
            padding: "16px",
            margin: "0",
            fontFamily: "Museo Sans Cyrl Bold",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.palette.text.main
        }
    }
}));

export const MemezatorWinners = () => {
    const classes = useStyles();
    const { l } = useLocalization();

    return (
        <Grid container spacing={2} className="description-container-right">
            <Grid className="user_profile_container">
                <div className={classes.memezatorRecentWinners}>
                    <div className={classes.memezatorRecentWinnersHeader}>
                        <h3>{l("memezator.card.recent-winners")}</h3>
                    </div>
                    <MemezatorWinnersList />
                </div>
            </Grid>
        </Grid>
    );
};
