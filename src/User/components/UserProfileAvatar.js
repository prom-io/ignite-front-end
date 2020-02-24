import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    userProfileHeaderAvatar: {
        display: "block",
        border: "none",
        left: 25,
        top: 0,
        borderRadius: "50%",
        height: 94,
        width: 94,
        backgroundRepeat: "no-repeat",
        backgroundsize: "auto",
        backgroundPosition: "center"
    }
}));

export const UserProfileAvatar = ({avatarUrl}) => {
    const classes = useStyles();

    return (
        <div className={classes.userProfileHeaderAvatar}
             style={{
                 backgroundImage: `url(${avatarUrl})`
             }}
        />
    )
};
