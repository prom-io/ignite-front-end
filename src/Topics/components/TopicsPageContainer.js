import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

import { useLocalization } from "../../store/hooks";

const useStyles = makeStyles(() => ({
    topicsTitle: {
        fontWeight: 600,
        fontSize: "20px",
        lineHeight: "24px",
        marginBottom: "24px"
    }
}));

export const TopicsPageContainer = () => {
    const classes = useStyles();
    const { l } = useLocalization();

    return (
        <div>
            <Typography className={classes.topicsTitle} variant="h6">
                {l("appbar.topics")}
            </Typography>
        </div>
    );
};
