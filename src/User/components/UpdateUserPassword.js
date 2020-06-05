import React from "react";
import { inject, observer } from "mobx-react";
import { Button, makeStyles } from "@material-ui/core";

import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    updateUserPassword: {
        background: "#fff"
    }
}));

const _UpdateUserPassword = ({
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
        <div className={classes.updateUserPassword}>
            Password
            <Button>Change</Button>
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

export const UpdateUserPassword = localized(
    inject(mapMobxToProps)(observer(_UpdateUserPassword))
);
