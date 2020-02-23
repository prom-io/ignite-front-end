import React from "react";
import {Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userProfileTab: {
        "&hover": {
            borderBottom: "2px solid #1C1C1C"
        },
        cursor: "pointer",
        flex: "1 1 auto"
    },
    userProfileActiveTab: {
        borderBottom: "2px solid #1C1C1C",
        cursor: "pointer",
        flex: "1 1 auto"
    }
}));

export const UserProfileTab = ({header, subheader, active, onSelectActive}) => {
    const classes = useStyles();

    return (
        <div className={active ? classes.userProfileActiveTab : classes.userProfileTab}
             onClick={onSelectActive}
        >
            <Typography variant="h6">
                {header}
            </Typography>
            <Typography variant="body1"
                        color="textSecondary"
            >
                {subheader}
            </Typography>
        </div>
    )
};
