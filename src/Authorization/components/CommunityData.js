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
  const { signUpForm, submissionError } = signUp;
  const { setGenericAuthorizationDialogType } = genericAuthorizationDialog;
  
  
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
     
      <Button
        variant="contained"
        color="primary"
        disabled={ signUpButtonDisabled }
        onClick={ () => {
          setGenericAuthorizationDialogType('communityData');
          /*doSignUp();*/
        } }
      >
      </Button>
    </DialogContent>
  );
});
