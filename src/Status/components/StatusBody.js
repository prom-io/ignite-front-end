import React from "react";
import {CardContent, Typography} from "@material-ui/core";

export const StatusBody = ({text}) => (
    <CardContent>
        <Typography variant="body1">
            {text}
        </Typography>
    </CardContent>
);
