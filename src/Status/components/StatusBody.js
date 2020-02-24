import React from "react";
import {CardContent, Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    statusText: {
        overflowWrap: "break-word"
    }
}));

export const StatusBody = ({text}) => {
    const classes = useStyles();

    return (
        <CardContent className="status-list-body-container">
            <Typography variant="body1"
                        className={classes.statusText}
            >
                {text}
            </Typography>
        </CardContent>
    );
};
