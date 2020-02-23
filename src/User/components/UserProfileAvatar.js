import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    userProfileHeaderAvatar: {
        display: "block",
        position: "absolute",
        border: "none",
        left: 25,
        top: -150,
        borderRadius: "50%",
        height: 200,
        width: 200
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
