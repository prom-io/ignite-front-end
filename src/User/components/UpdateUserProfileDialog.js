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
import { makeStyles } from '@material-ui/core/styles';
import { FadeLoader } from 'react-spinners';

const useStyles = makeStyles(theme => ({
    dialogTitleRoot: {
        '& h2': {
            fontFamily: 'Museo Sans Cyrl Bold',
            fontSize: '15px',
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '40px',
            padding: ' 13px 24px',
        },
    },
    dialogContentRoot: {
        borderTop: '1px solid #F1EBE8',
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    dialogContent: {
        [theme.breakpoints.down('sm')]: {
            padding: '8px 24px',
        },
    },
    textFieldRoot: {
        maxHeight: '72px',
        marginTop: '16px',
    },
}));


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
}) => {
    const classes = useStyles();
    
    return(
      <Dialog
        open={updateUserProfileDialogOpen}
        onClose={() => setUpdateUserProfileDialogOpen(false)}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
      >
          <DialogTitle classes={{ root: classes.dialogTitleRoot }}>
              {l('user.update-profile')}
          </DialogTitle>
          <DialogContent classes={{root:classes.dialogContentRoot}}>
              <UserAvatarFileInput />
              <div className={classes.dialogContent}>
                  <TextField
                    label={l('user.username')}
                    value={updateUserProfileForm.username}
                    onChange={event => setFormValue('username', event.target.value)}
                    error={Boolean(formErrors.username)}
                    helperText={formErrors.username && l(formErrors.username)}
                    classes={{root: classes.textFieldRoot}}
                    fullWidth
                    margin="dense"
                    InputProps={{
                        endAdornment: (
                          checkingUsernameAvailability && (
                            <InputAdornment position="end">
                                <FadeLoader css={'transform: scale(0.5)'} color={'#FF5C01'}/>
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
                    classes={{root: classes.textFieldRoot}}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label={l('user.bio')}
                    value={updateUserProfileForm.bio || ''}
                    onChange={event => setFormValue('bio', event.target.value)}
                    error={Boolean(formErrors.bio)}
                    helperText={formErrors.bio && l(formErrors.bio)}
                    classes={{root: classes.textFieldRoot}}
                    fullWidth
                    margin="dense"
                    multiline
                    rowsMax={3}
                  />
              </div>
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
                  {pending && <FadeLoader css={'transform: scale(0.5)'} color={'#FF5C01'}/>}
                  {l('user.update-profile.save-changes')}
              </Button>
          </DialogActions>
      </Dialog>
)};

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
