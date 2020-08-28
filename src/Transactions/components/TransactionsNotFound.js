import React from "react";
import { observer } from "mobx-react";
import { Typography, makeStyles } from "@material-ui/core";

import { useLocalization } from "../../store";
import { SadIconLarge } from "../../icons/SadIconLarge";

const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.primary.main
    },
    emptyListContainer: {
        border: `1px solid ${theme.palette.border.main}`
    },
    emptyListContent: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2)
    },
    emptyListLabel: {
        display: "flex",
        paddingLeft: theme.spacing(2)
    }
}));

export const TransactionsNotFound = observer(({ type }) => {
    const classes = useStyles();
    const { l } = useLocalization();

    return (
        <div className={classes.emptyListContainer}>
            <div className={classes.emptyListContent}>
                <SadIconLarge />
                <div className={classes.emptyListLabel}>
                    <Typography>
                        <strong>
                            Transactions not found.
                        </strong>
                    </Typography>
                </div>
            </div>
        </div>
    );
});