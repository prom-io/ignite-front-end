import React, { useState } from "react";
import { Avatar, Dialog } from "@material-ui/core";

export const UserProfileAvatar = ({ avatarUrl }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
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
                    cursor: "pointer"
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
