import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({}));

export const CommunityItem = ({ community }) => {
    const classes = useStyles();

    return <div key={community}>Community #{community}</div>;
};
