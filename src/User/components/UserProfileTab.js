import React from "react";
import {Typography, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userProfileTab: {
        cursor: "pointer",
        flex: "1 1 auto",
        color: '#A2A2A2'
    },
    userProfileActiveTab: {
        borderBottom: "2px solid #FF5C01",
        cursor: "pointer",
        flex: "1 1 auto",
        color: '#1C1C1C',
        "&.MuiTypography-colorTextSecondary p": {
            color: '#1C1C1C'
        }
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
                        // color="textSecondary"
            >
                {subheader}
            </Typography>
        </div>
    )
};
