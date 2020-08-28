import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import {
    Button,
    Typography,
    TextField,
    MenuItem,
    Dialog,
    DialogContent,
    makeStyles
} from "@material-ui/core";

import { UserAvatarFileInput } from "./UserAvatarFileInput";
import { CustomDialogTitle } from "../../Authorization/components";
import Loader from "../../components/Loader";
import { localized } from "../../localization/components";
import { Routes } from "../../routes";

const useStyles = makeStyles(theme => ({
    updateUserProfile: {
        background: theme.palette.background.paper,
        marginBottom: "8px",
        padding: "24px 24px 45px 24px",
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column"
        }
    },
    updateUserProfileInfo: {
        zIndex: 1,
        maxWidth: "345px",
        marginLeft: "20px",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0",
            maxWidth: "unset"
        }
    },
    updateUserProfileWallet: {
        "& p": {
            fontWeight: 300,
            fontSize: "12px",
            lineHeight: "14px",
            color: theme.palette.text.secondary,
            margin: "0 0 8px 0"
        },
        "& h5": {
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "19px",
            color: theme.palette.text.main,
            wordWrap: "break-word"
        }
    },
    updateUserProfileField: {
        marginTop: "15px",
        "& span": {
            display: "block",
            textAlign: "right",
            fontFamily: "Museo Sans Cyrl Regular",
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "12px",
            lineHeight: "14px",
            color: theme.palette.text.secondary
        },
        "& input[value]:not(:focus)": {
            maxWidth: "340px",
            overflowX: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            "&:after": {
                content: "'...'"
            }
        }
    },
    updateUserProfileButton: {
        marginTop: "60px",
        textAlign: "right",

        "& button": {
            boxSizing: "border-box",
            fontSize: "15px",
            fontWeight: 600,
            height: "40px",
            borderRadius: "30px",
            padding: "11px 35px",
            lineHeight: "18px"
        }
    },
    replyingToLink: {
        textDecoration: "none"
    },
    dialogRoot: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Museo Sans Cyrl Regular",
        fontStyle: "normal",
        fontWeight: 300,
        fontSize: "18px",
        lineHeight: "32px",
        "& a": {
            marginTop: "30px"
        }
    }
}));

const _UpdateUserProfile = ({
    routerStore,
    currentUser,
    updateUserProfileForm,
    formErrors,
    pending,
    checkingUsernameAvailability,
    avatarUploadPending,
    updateUser,
    setFormValue,
    openSuccessDialog,
    setOpenSuccessDialog,
    l
}) => {
    const classes = useStyles();

    const handleClose = () => {
        setOpenSuccessDialog(false);
    };

    return (
        <>
            <div className={classes.updateUserProfile}>
                <UserAvatarFileInput />
                <div className={classes.updateUserProfileInfo}>
                    <div className={classes.updateUserProfileWallet}>
                        <Typography>Wallet</Typography>
                        <Typography variant="h5">{currentUser.id}</Typography>
                    </div>
                    <div
                        className={classes.updateUserProfileField}
                        style={{ marginTop: "40px" }}
                    >
                        <TextField
                            label={l("user.username")}
                            placeholder="Add your username"
                            value={updateUserProfileForm.username}
                            onChange={event =>
                                setFormValue("username", event.target.value)
                            }
                            error={Boolean(formErrors.username)}
                            helperText={
                                formErrors.username && l(formErrors.username)
                            }
                            margin="dense"
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                        <span>
                            {updateUserProfileForm.username.length}
                            /50
                        </span>
                    </div>
                    <div className={classes.updateUserProfileField}>
                        <TextField
                            className={classes.updateUserProfileField}
                            label={l("user.display-name")}
                            placeholder="Add your displayed name"
                            value={updateUserProfileForm.displayName}
                            onChange={event =>
                                setFormValue("displayName", event.target.value)
                            }
                            error={Boolean(formErrors.displayName)}
                            helperText={
                                formErrors.displayName && l(formErrors.displayName)
                            }
                            margin="dense"
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                        <span>
                            {updateUserProfileForm.displayName.length}
                            /50
                        </span>
                    </div>
                    <div className={classes.updateUserProfileField}>
                        <TextField
                            className={classes.updateUserProfileField}
                            label={l("settings.language")}
                            placeholder="Select your language"
                            value={updateUserProfileForm.language || "en"}
                            onChange={event =>
                                setFormValue("language", event.target.value)
                            }
                            margin="dense"
                            InputLabelProps={{
                                shrink: true
                            }}
                            select
                            fullWidth
                        >
                            <MenuItem value="en">
                                {l("settings.language.english")}
                            </MenuItem>
                            <MenuItem value="kr">
                                {l("settings.language.korean")}
                            </MenuItem>
                        </TextField>
                    </div>
                    <div className={classes.updateUserProfileField}>
                        <TextField
                            className={classes.updateUserProfileField}
                            label={l("user.bio")}
                            placeholder="Add your bio"
                            value={updateUserProfileForm.bio || ""}
                            onChange={event =>
                                setFormValue("bio", event.target.value)
                            }
                            error={Boolean(formErrors.bio)}
                            helperText={formErrors.bio && l(formErrors.bio)}
                            rowsMax={3}
                            margin="dense"
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                            multiline
                        />
                        <span>
                            {updateUserProfileForm.bio
                                ? updateUserProfileForm.bio.length
                                : 0}
                            /160
                        </span>
                    </div>
                    <div className={classes.updateUserProfileField}>
                        <TextField
                            className={classes.updateUserProfileField}
                            label={l("user.external-url")}
                            placeholder="Add your external url"
                            value={updateUserProfileForm.external_url}
                            onChange={event =>
                                setFormValue("external_url", event.target.value)
                            }
                            error={Boolean(formErrors.external_url)}
                            helperText={
                                formErrors.external_url && l(formErrors.external_url)
                            }
                            margin="dense"
                            InputLabelProps={{
                                shrink: true
                            }}
                            fullWidth
                        />
                        <span>
                            {updateUserProfileForm.external_url
                                ? updateUserProfileForm.external_url.length
                                : 0}
                            /100
                        </span>
                    </div>
                    <div className={classes.updateUserProfileButton}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={updateUser}
                            disabled={
                                pending ||
                                checkingUsernameAvailability ||
                                avatarUploadPending
                            }
                        >
                            {pending && (
                                <Loader
                                    size="md"
                                    css="position:absolute; top:0; left: 34px"
                                />
                            )}
                            {l("user.update-profile.save")}
                        </Button>
                    </div>
                </div>
            </div>
            <Dialog onClose={handleClose} open={openSuccessDialog}>
                <CustomDialogTitle
                    title="Your changes saved!"
                    type="default"
                    setDialogOpen={setOpenSuccessDialog}
                />
                <DialogContent classes={{ root: classes.dialogRoot }}>
                    Your changes were successfully saved! Please click OK to return
                    to the profile page.
                    <Link
                        store={routerStore}
                        view={Routes.userProfile}
                        className={classes.replyingToLink}
                        params={{ username: currentUser.username }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                            disabled={
                                pending ||
                                checkingUsernameAvailability ||
                                avatarUploadPending
                            }
                        >
                            {l("dialog.ok")}
                        </Button>
                    </Link>
                </DialogContent>
            </Dialog>
        </>
    );
};

const mapMobxToProps = ({ userProfileUpdate, store }) => ({
    routerStore: store,
    currentUser: userProfileUpdate.currentUser,
    updateUserProfileForm: userProfileUpdate.updateUserProfileForm,
    formErrors: userProfileUpdate.formErrors,
    submissionError: userProfileUpdate.submissionError,
    pending: userProfileUpdate.pending,
    checkingUsernameAvailability: userProfileUpdate.checkingUsernameAvailability,
    avatarUploadPending: userProfileUpdate.avatarUploadPending,
    setFormValue: userProfileUpdate.setFormValue,
    updateUser: userProfileUpdate.updateUser,
    openSuccessDialog: userProfileUpdate.openSuccessDialog,
    setOpenSuccessDialog: userProfileUpdate.setOpenSuccessDialog
});

export const UpdateUserProfile = localized(
    inject(mapMobxToProps)(observer(_UpdateUserProfile))
);
