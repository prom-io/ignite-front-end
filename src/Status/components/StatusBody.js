import React from "react";
import {CardContent, Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    statusText: {
        overflowWrap: "break-word",
        fontFamily: "Museo Sans Cyrl",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: "15px",
        lineHeight: "23px",
        color: "#1C1C1C"
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
