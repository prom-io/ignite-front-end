import React, { useState, useCallback } from "react";
import { inject, observer } from "mobx-react";
import Cropper from "react-easy-crop";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Slider,
    IconButton,
    makeStyles
} from "@material-ui/core";

import { ModalCloseIcon } from "../../icons/ModalCloseIcon";
import { ZoomInIcon } from "../../icons/ZoomInIcon";
import { ZoomOutIcon } from "../../icons/ZoomOutIcon";
import getCroppedImg from "./utils/cropImage";
import Loader from "../../components/Loader";

const useStyles = makeStyles(() => ({
    dialogPaper: {
        position: "relative",
        width: "100%",
        maxWidth: "500px"
    },
    dialogCloseBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "40px",
        height: "40px",
        margin: "8px",
        lineHeight: 0
    },
    dialogTitle: {
        padding: "12px 24px"
    },
    dialogContent: {
        position: "relative",
        height: "380px",
        margin: "0 24px",
        padding: 0
    },
    cropContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    slider: {
        margin: "0 15px"
    },
    dialogActions: {
        margin: "0 24px",
        padding: "12px 0"
    },
    applyButton: {
        minWidth: "100px",
        marginLeft: "32px"
    }
}));

const _UserAvatarCropDialog = ({
    openAvatarCropDialog,
    setOpenAvatarCropDialog,
    pending,
    fileToCropUrl,
    uploadFile
}) => {
    const classes = useStyles();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const applyCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                fileToCropUrl,
                croppedAreaPixels
            );
            uploadFile(croppedImage);
        } catch (e) {
            console.error("ERROR: ", e);
        }
    }, [croppedAreaPixels]);

    return (
        <Dialog
            classes={{ paper: classes.dialogPaper }}
            open={openAvatarCropDialog}
            onClose={() => setOpenAvatarCropDialog(false)}
        >
            <IconButton
                onClick={() => setOpenAvatarCropDialog(false)}
                className={classes.dialogCloseBtn}
            >
                <ModalCloseIcon />
            </IconButton>
            <DialogTitle classes={{ root: classes.dialogTitle }}>
                Edit media
            </DialogTitle>
            <DialogContent classes={{ root: classes.dialogContent }}>
                <div className={classes.cropContainer}>
                    <Cropper
                        image={fileToCropUrl}
                        crop={crop}
                        zoom={zoom}
                        aspect={3 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
            </DialogContent>
            <DialogActions classes={{ root: classes.dialogActions }} disableSpacing>
                <ZoomInIcon />
                <Slider
                    classes={{ root: classes.slider }}
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e, zoom) => setZoom(zoom)}
                />
                <ZoomOutIcon />
                <Button
                    disabled={pending}
                    classes={{ root: classes.applyButton }}
                    variant="contained"
                    color="primary"
                    onClick={applyCroppedImage}
                >
                    {pending && (
                        <Loader
                            size="md"
                            css="position:absolute; top:0; left: 34px"
                        />
                    )}
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const mapMobxToProps = ({ userAvatarUpload }) => ({
    openAvatarCropDialog: userAvatarUpload.openAvatarCropDialog,
    setOpenAvatarCropDialog: userAvatarUpload.setOpenAvatarCropDialog,
    pending: userAvatarUpload.pending,
    fileToCropUrl: userAvatarUpload.fileToCropUrl,
    uploadFile: userAvatarUpload.uploadFile
});

export const UserAvatarCropDialog = inject(mapMobxToProps)(
    observer(_UserAvatarCropDialog)
);
