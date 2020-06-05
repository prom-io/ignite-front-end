import React from "react";
import { inject, observer } from "mobx-react";
import { Button, InputAdornment, TextField, makeStyles } from "@material-ui/core";
import { FadeLoader } from "react-spinners";

import { UserAvatarFileInput } from "./UserAvatarFileInput";
import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    updateUserProfile: {
        background: "#fff",
        marginBottom: "8px",
        padding: "24px",
        display: "flex"
    }
}));

const _UpdateUserProfile = ({
    updateUserProfileForm,
    formErrors,
    pending,
    checkingUsernameAvailability,
    avatarUploadPending,
    updateUser,
    setFormValue,
    l
}) => {
    const classes = useStyles();

    return (
        <div className={classes.updateUserProfile}>
            <UserAvatarFileInput />
            <div>
                <div className={classes.updateUserProfileWallet}>
                    <p>Wallet</p>
                    <h5>0x9687DF9460CD2333d18d85C1b768eFa5f5DfDf3c</h5>
                </div>
                <TextField
                    label={l("user.username")}
                    value={updateUserProfileForm.username}
                    onChange={event => setFormValue("username", event.target.value)}
                    error={Boolean(formErrors.username)}
                    helperText={formErrors.username && l(formErrors.username)}
                    classes={{ root: classes.textFieldRoot }}
                    fullWidth
                    margin="dense"
                    InputProps={{
                        endAdornment: checkingUsernameAvailability && (
                            <InputAdornment position="end">
                                <FadeLoader
                                    css={"transform: scale(0.5)"}
                                    color={"#FF5C01"}
                                />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    label={l("user.display-name")}
                    value={updateUserProfileForm.displayName}
                    onChange={event =>
                        setFormValue("displayName", event.target.value)
                    }
                    error={Boolean(formErrors.displayName)}
                    helperText={formErrors.displayName && l(formErrors.displayName)}
                    classes={{ root: classes.textFieldRoot }}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label={l("user.bio")}
                    value={updateUserProfileForm.bio || ""}
                    onChange={event => setFormValue("bio", event.target.value)}
                    error={Boolean(formErrors.bio)}
                    helperText={formErrors.bio && l(formErrors.bio)}
                    classes={{ root: classes.textFieldRoot }}
                    fullWidth
                    margin="dense"
                    multiline
                    rowsMax={3}
                />
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
                        <FadeLoader
                            css={"transform: scale(0.5)"}
                            color={"#FF5C01"}
                        />
                    )}
                    {l("user.update-profile.save-changes")}
                </Button>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ userProfileUpdate }) => ({
    updateUserProfileForm: userProfileUpdate.updateUserProfileForm,
    formErrors: userProfileUpdate.formErrors,
    submissionError: userProfileUpdate.submissionError,
    pending: userProfileUpdate.pending,
    checkingUsernameAvailability: userProfileUpdate.checkingUsernameAvailability,
    avatarUploadPending: userProfileUpdate.avatarUploadPending,
    setFormValue: userProfileUpdate.setFormValue,
    updateUser: userProfileUpdate.updateUser
});

export const UpdateUserProfile = localized(
    inject(mapMobxToProps)(observer(_UpdateUserProfile))
);
