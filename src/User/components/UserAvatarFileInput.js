import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Avatar, Button, makeStyles } from "@material-ui/core";
import { Photo } from "@material-ui/icons";
import { FadeLoader } from "react-spinners";

const useStyles = makeStyles(theme => ({
    avatarAttachmentContainer: {
        paddingLeft: "28px",
        paddingRight: "36px"
    },
    avatarAttachmentPhoto: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    avatarUploadButton: {
        position: "absolute",
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        background: "rgba(34, 34, 34, 0.8)"
    }
}));

const _UserAvatarFileInput = ({ currentUser, avatarFileContainer, uploadFile }) => {
    const classes = useStyles();
    const [value, setValue] = useState(undefined);

    const handleFileAttachment = files => {
        if (files && files.length !== 0) {
            uploadFile(files[0]);
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
                            : currentUser.avatar
                    }
                />
                <Button
                    disabled={avatarFileContainer && avatarFileContainer.pending}
                    component="label"
                    variant="outlined"
                    classes={{ root: classes.avatarUploadButton }}
                >
                    {avatarFileContainer && avatarFileContainer.pending ? (
                        <FadeLoader
                            css={"transform: scale(0.5)"}
                            color={"#FF5C01"}
                        />
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
        </div>
    );
};

const mapMobxToProps = ({ authorization, userAvatarUpload }) => ({
    currentUser: authorization.currentUser,
    avatarFileContainer: userAvatarUpload.avatarFileContainer,
    uploadFile: userAvatarUpload.uploadFile
});

export const UserAvatarFileInput = inject(mapMobxToProps)(
    observer(_UserAvatarFileInput)
);
