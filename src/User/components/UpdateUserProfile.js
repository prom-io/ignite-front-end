import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Button,
    InputAdornment,
    Typography,
    TextField,
    makeStyles,
} from '@material-ui/core';
import { FadeLoader } from 'react-spinners';

import { UserAvatarFileInput } from './UserAvatarFileInput';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    updateUserProfile: {
        background: '#fff',
        marginBottom: '8px',
        padding: '24px 24px 45px 24px',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    updateUserProfileInfo: {
        zIndex: 1,
        maxWidth: '345px',
        marginLeft: '20px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0',
            maxWidth: 'unset',
        },
    },
    updateUserProfileWallet: {
        '& p': {
            fontWeight: 300,
            fontSize: '12px',
            lineHeight: '14px',
            color: '#A2A2A2',
            margin: '0 0 8px 0',
        },
        '& h5': {
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '19px',
            color: '#1C1C1C',
            wordWrap: 'break-word',
        },
    },
    updateUserProfileField: {
        marginTop: '15px',

        '& span': {
            display: 'block',
            textAlign: 'right',
            fontFamily: 'Museo Sans Cyrl Regular',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '12px',
            lineHeight: '14px',
            textAlign: 'right',
            color: '#A2A2A2',
        },
    },
    updateUserProfileButton: {
        marginTop: '60px',
        textAlign: 'right',

        '& button': {
            boxSizing: 'border-box',
            fontSize: '15px',
            fontWeight: 600,
            height: '40px',
            borderRadius: '30px',
            padding: '11px 35px',
            lineHeight: '18px',
        },
    },
}));

const _UpdateUserProfile = ({
    currentUser,
    updateUserProfileForm,
    formErrors,
    pending,
    checkingUsernameAvailability,
    avatarUploadPending,
    updateUser,
    setFormValue,
    l,
}) => {
    const classes = useStyles();

    return (
        <div className={classes.updateUserProfile}>
            <UserAvatarFileInput />
            <div className={classes.updateUserProfileInfo}>
                <div className={classes.updateUserProfileWallet}>
                    <p>Wallet</p>
                    <Typography variant="h5">{currentUser.id}</Typography>
                </div>
                <div className={classes.updateUserProfileField} style={{ marginTop: '40px' }}>
                    <TextField
                        label={l('user.username')}
                        placeholder="Add your username"
                        value={updateUserProfileForm.username}
                        onChange={event => setFormValue('username', event.target.value)}
                        error={Boolean(formErrors.username)}
                        helperText={formErrors.username && l(formErrors.username)}
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
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
                        label={l('user.display-name')}
                        placeholder="Add your displayed name"
                        value={updateUserProfileForm.displayName}
                        onChange={event => setFormValue('displayName', event.target.value)}
                        error={Boolean(formErrors.displayName)}
                        helperText={
                            formErrors.displayName && l(formErrors.displayName)
                        }
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
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
                        label={l('user.bio')}
                        placeholder="Add your bio"
                        value={updateUserProfileForm.bio || ''}
                        onChange={event => setFormValue('bio', event.target.value)}
                        error={Boolean(formErrors.bio)}
                        helperText={formErrors.bio && l(formErrors.bio)}
                        rowsMax={3}
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        multiline
                    />
                    <span>
                        {updateUserProfileForm.bio ? updateUserProfileForm.bio.length : 0}
                        /160
                    </span>
                </div>
                <div className={classes.updateUserProfileButton}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={updateUser}
                        disabled={
                            pending
                            || checkingUsernameAvailability
                            || avatarUploadPending
                        }
                    >
                        {pending && (
                            <FadeLoader
                                css="transform: scale(0.5)"
                                color="#FF5C01"
                            />
                        )}
                        {l('user.update-profile.save')}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ userProfileUpdate }) => ({
    currentUser: userProfileUpdate.currentUser,
    updateUserProfileForm: userProfileUpdate.updateUserProfileForm,
    formErrors: userProfileUpdate.formErrors,
    submissionError: userProfileUpdate.submissionError,
    pending: userProfileUpdate.pending,
    checkingUsernameAvailability: userProfileUpdate.checkingUsernameAvailability,
    avatarUploadPending: userProfileUpdate.avatarUploadPending,
    setFormValue: userProfileUpdate.setFormValue,
    updateUser: userProfileUpdate.updateUser,
});

export const UpdateUserProfile = localized(
    inject(mapMobxToProps)(observer(_UpdateUserProfile)),
);
