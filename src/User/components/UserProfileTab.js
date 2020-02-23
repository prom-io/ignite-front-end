import React from "react";
import {Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userProfileTab: {
        "&hover": {
            borderBottom: "2px solid #1C1C1C"
        },
        cursor: "pointer"
    },
    userProfileActiveTab: {
        borderBottom: "2px solid #1C1C1C",
        cursor: "pointer"
    }
}));


