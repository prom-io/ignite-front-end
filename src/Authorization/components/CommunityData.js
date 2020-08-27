import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Checkbox, DialogContent, TextField } from '@material-ui/core';
import { useLocalization, useStore } from '../../store/hooks';
import {authorizationDialogsStyles} from '../../styles/material/authorizationDialogsStyles'
import { UserAvatarFileInput } from '../../User/components';

export const CommunityData = observer(() => {
  const classes = authorizationDialogsStyles();
  const { signUp, genericAuthorizationDialog } = useStore();
  const { l, locale } = useLocalization();
  const { formErrors, setCommunityFormValue, doSignUp, signUpCommunityForm, submissionError } = signUp;
  const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;
  
  const signUpButtonDisabled = false;
  
  
  const handleOkClick = () => {
    if (submissionError) {
      setGenericAuthorizationDialogType('errorAuthorization');
    } else {
      setGenericAuthorizationDialogType('welcome');
    }
  };
  
  return (
    <DialogContent classes={{
      root: classes.dialogContentRoot,
    }}
    >
      <UserAvatarFileInput />
      <div
        className={classes.updateUserProfileField}
        style={{ marginTop: "40px" }}
      >
        <TextField
          label={l("user.username")}
          placeholder="Add your username"
          value={signUpCommunityForm.username}
          onChange={event =>
            setCommunityFormValue("username", event.target.value)
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
          {signUpCommunityForm.username.length}
          /50
        </span>
      </div>
      <Button
        variant="contained"
        color="primary"
        disabled={ signUpButtonDisabled }
        onClick={ () => {
          setGenericAuthorizationDialogType('communityData');
          doSignUp();
        } }
      >
      </Button>
    </DialogContent>
  );
});
