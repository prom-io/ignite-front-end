import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Avatar, Button, makeStyles } from "@material-ui/core";
import { Photo } from "@material-ui/icons";

import { UserAvatarCropDialog } from "./UserAvatarCropDialog";
import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
    avatarAttachmentPhoto: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    avatarAttachmentContainer: {
        [theme.breakpoints.down("sm")]: {
            background: theme.palette.background.light,
            padding: "8px 24px"
        }
    },
    avatarUploadButton: {
        position: "absolute",
        width: "120px",
        height: "120px",
        borderRadius: "80px",
        background: "rgba(34, 34, 34, 0.8)"
    }
}));

const _UserAvatarFileInput = ({
    currentUser,
    avatarFileContainer,
    setOpenAvatarCropDialog
}) => {
    const classes = useStyles();
    const [value, setValue] = useState(undefined);

    const handleFileAttachment = files => {
        if (files && files.length !== 0) {
            setOpenAvatarCropDialog(true, files[0]);
        }
    };

    return (
        <div className={classes.avatarAttachmentContainer}>
            <div className={classes.avatarAttachmentPhoto}>
                <Avatar
                    style={{
                        width: 120,
                        height: 120
                    }}
                    src={
                        avatarFileContainer
                            ? avatarFileContainer.url
                            : currentUser
                            ? currentUser.avatar
                            : null
                    }
                />
                <Button
                    disabled={avatarFileContainer && avatarFileContainer.pending}
                    component="label"
                    variant="outlined"
                    classes={{ root: classes.avatarUploadButton }}
                >
                    {avatarFileContainer && avatarFileContainer.pending ? (
                        <Loader size="md" />
                    ) : (
                        <Photo style={{ color: "#fff" }} />
                    )}
                    <input
                        type="file"
                        value={value}
                        style={{ display: "none" }}
                        accept="image/png, image/jpg, image/jpeg"
                        onClick={() => setValue("")}
                        onChange={event => handleFileAttachment(event.target.files)}
                    />
                </Button>
            </div>
            <UserAvatarCropDialog />
        </div>
    );
};

const mapMobxToProps = ({ authorization, userAvatarUpload }) => ({
    currentUser: authorization.currentUser,
    avatarFileContainer: userAvatarUpload.avatarFileContainer,
    setOpenAvatarCropDialog: userAvatarUpload.setOpenAvatarCropDialog
});

export const UserAvatarFileInput = inject(mapMobxToProps)(
    observer(_UserAvatarFileInput)
);
