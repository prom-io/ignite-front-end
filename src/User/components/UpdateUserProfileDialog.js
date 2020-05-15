import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    TextField,
    withMobileDialog,
} from '@material-ui/core';
import { UserAvatarFileInput } from './UserAvatarFileInput';
import { localized } from '../../localization/components';

const _UpdateUserProfileDialog = ({
    updateUserProfileForm,
    updateUserProfileDialogOpen,
    formErrors,
    submissionError,
    pending,
    checkingUsernameAvailability,
    avatarUploadPending,
    updateUser,
    setFormValue,
    setUpdateUserProfileDialogOpen,
    fullScreen,
    l,
}) => (
    <Dialog
        open={updateUserProfileDialogOpen}
        onClose={() => setUpdateUserProfileDialogOpen(false)}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
    >
        <DialogTitle>
            {l('user.update-profile')}
        </DialogTitle>
        <DialogContent>
            <UserAvatarFileInput />
            <TextField
                label={l('user.username')}
                value={updateUserProfileForm.username}
                onChange={event => setFormValue('username', event.target.value)}
                error={Boolean(formErrors.username)}
                helperText={formErrors.username && l(formErrors.username)}
                fullWidth
                margin="dense"
                InputProps={{
                    endAdornment: (
                        checkingUsernameAvailability && (
                            <InputAdornment position="end">
                                <CircularProgress size={15} color="primary" />
                            </InputAdornment>
                        )
                    ),
                }}
            />
            <TextField
                label={l('user.display-name')}
                value={updateUserProfileForm.displayName}
                onChange={event => setFormValue('displayName', event.target.value)}
                error={Boolean(formErrors.displayName)}
                helperText={formErrors.displayName && l(formErrors.displayName)}
                fullWidth
                margin="dense"
            />
            <TextField
                label={l('user.bio')}
                value={updateUserProfileForm.bio || ''}
                onChange={event => setFormValue('bio', event.target.value)}
                error={Boolean(formErrors.bio)}
                helperText={formErrors.bio && l(formErrors.bio)}
                fullWidth
                margin="dense"
                multiline
                rows={4}
            />
        </DialogContent>
        <DialogActions>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setUpdateUserProfileDialogOpen(false)}
            >
                {l('user.update-profile.close')}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={updateUser}
                disabled={pending || checkingUsernameAvailability || avatarUploadPending}
            >
                {pending && <CircularProgress size={15} color="primary" />}
                {l('user.update-profile.save-changes')}
            </Button>
        </DialogActions>
    </Dialog>
);

const mapMobxToProps = ({ userProfileUpdate }) => ({
    updateUserProfileForm: userProfileUpdate.updateUserProfileForm,
    updateUserProfileDialogOpen: userProfileUpdate.updateUserProfileDialogOpen,
    formErrors: userProfileUpdate.formErrors,
    submissionError: userProfileUpdate.submissionError,
    pending: userProfileUpdate.pending,
    checkingUsernameAvailability: userProfileUpdate.checkingUsernameAvailability,
    avatarUploadPending: userProfileUpdate.avatarUploadPending,
    setFormValue: userProfileUpdate.setFormValue,
    setUpdateUserProfileDialogOpen: userProfileUpdate.setUpdateUserProfileDialogOpen,
    updateUser: userProfileUpdate.updateUser,
});

export const UpdateUserProfileDialog = localized(
    withMobileDialog()(inject(mapMobxToProps)(observer(_UpdateUserProfileDialog))),
);
