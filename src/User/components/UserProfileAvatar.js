import React, { useState } from "react";
import { Avatar, Dialog, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    userProfileAvatar: {
        width: "94px",
        height: "94px",
        margin: "0 auto"
    }
}));

export const UserProfileAvatar = ({ avatarUrl }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const avatarIsNull = avatarUrl.includes("default_user.png");

    const handleClickOpen = () => {
        if (avatarIsNull) {
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Avatar
                classes={{ root: classes.userProfileAvatar }}
                onClick={handleClickOpen}
                src={avatarUrl}
                style={{
                    cursor: avatarIsNull ? "default" : "pointer"
                }}
            />
            <Dialog open={open} onClose={handleClose}>
                <img
                    src={avatarUrl}
                    alt=""
                    style={{
                        width: "100%"
                    }}
                />
            </Dialog>
        </>
    );
};
