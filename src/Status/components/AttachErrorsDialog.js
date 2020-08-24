import React from "react";
import { inject, observer } from "mobx-react";
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    DialogTitle,
    IconButton,
    makeStyles
} from "@material-ui/core";

import { ModalCloseIcon } from "../../icons/ModalCloseIcon";
import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    attachDialog: {
        position: "relative",
        padding: "32px"
    },
    attachDialogCloseBtn: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "40px",
        height: "40px",
        margin: "8px",
        lineHeight: 0
    },
    attachDialogTitle: {
        marginBottom: "24px",
        padding: 0,
        textAlign: "center",

        "& h2": {
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.palette.text.main,
            marginBottom: 0
        }
    },
    attachDialogContent: {
        marginBottom: "24px",
        padding: 0,
        textAlign: "center",

        "& p": {
            margin: 0,
            fontWeight: 300,
            fontSize: "15px",
            lineHeight: "26px",
            color: theme.palette.text.main
        }
    },
    dialogActionsButton: {
        padding: 0
    },
    attachDialogButton: {
        display: "block",
        height: "40px",
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "18px",
        minWidth: "115px",
        margin: "0 auto"
    },
    dialogPaper: {
        margin: "15px",
        maxWidth: "400px",
        width: "100%"
    }
}));

const _AttachErrorsDialog = ({
    showErrorModal,
    errorModalLabel,
    setShowErrorModal,
    l
}) => {
    const classes = useStyles();

    return (
        <Dialog
            open={showErrorModal}
            onClose={() => setShowErrorModal(false)}
            classes={{
                paper: classes.dialogPaper
            }}
        >
            <div className={classes.attachDialog}>
                <IconButton
                    onClick={() => setShowErrorModal(false)}
                    className={classes.attachDialogCloseBtn}
                >
                    <ModalCloseIcon />
                </IconButton>
                <DialogTitle className={classes.attachDialogTitle}>
                    {l("dialog.sorry")}
                </DialogTitle>
                <DialogContent className={classes.attachDialogContent}>
                    <DialogContentText>{l(errorModalLabel)}</DialogContentText>
                </DialogContent>
                <DialogActions className={classes.dialogActionsButton}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.attachDialogButton}
                        onClick={() => setShowErrorModal(false)}
                    >
                        {l("dialog.ok")}
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

const mapMobxToProps = ({ uploadMediaAttachments }) => ({
    showErrorModal: uploadMediaAttachments.showErrorModal,
    errorModalLabel: uploadMediaAttachments.errorModalLabel,
    setShowErrorModal: uploadMediaAttachments.setShowErrorModal
});

export const AttachErrorsDialog = localized(
    inject(mapMobxToProps)(observer(_AttachErrorsDialog))
);
