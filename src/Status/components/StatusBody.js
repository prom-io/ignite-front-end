import React from "react";
import {CardContent, Typography, makeStyles, Card} from "@material-ui/core";
import {StatusMediaAttachments} from "./StatusMediaAttachments";

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

export const StatusBody = ({text, mediaAttachments}) => {
    const classes = useStyles();

    return (
        <CardContent className="status-list-body-container" style={{flex: "auto"}}>
            <Typography variant="body1"
                        className={classes.statusText}
            >
                {text}
            </Typography>
            <StatusMediaAttachments mediaAttachments={mediaAttachments}/>
        </CardContent>
    );
};
