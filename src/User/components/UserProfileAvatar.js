import React, { useState } from "react";
import { Avatar, Dialog } from "@material-ui/core";

export const UserProfileAvatar = ({ avatarUrl }) => {
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
                onClick={handleClickOpen}
                src={avatarUrl}
                style={{
                    width: 94,
                    height: 94,
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
