import React  from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, TextField, Typography } from '@material-ui/core';
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
      <Typography>
        {l('sign-up.community-about')}
      </Typography>
      {/*<UserAvatarFileInput />*/}
      <div
        className={classes.updateUserProfileField}
        style={{ marginTop: "20px" }}
      >
        <TextField
          label={l("user.username")}
          placeholder="Add your username"
          value={signUpCommunityForm.username}
          onChange={event =>
            setCommunityFormValue("username", event.target.value)
          }
          error={Boolean(formErrors.username)}
          helperText={ formErrors.username && l(formErrors.username) }
          margin="dense"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <span>
          {signUpCommunityForm.username.length}
          /50
        </span>
      </div>
      
      <div
        className={classes.updateUserProfileField}
        style={{ marginTop: "20px" }}
      >
        <TextField
          label={l("user.display-name")}
          placeholder="Add your display name"
          value={signUpCommunityForm.displayName}
          onChange={event =>
            setCommunityFormValue("displayName", event.target.value)
          }
          error={Boolean(formErrors.displayName)}
          helperText={ formErrors.displayName && l(formErrors.displayName) }
          margin="dense"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <span>
          {signUpCommunityForm.displayName.length}
          /50
        </span>
      </div>
      
      <div
        className={classes.updateUserProfileField}
        style={{ marginTop: "20px" }}
      >
        <TextField
          label={l("user.bio")}
          placeholder="About"
          value={signUpCommunityForm.about}
          onChange={event =>
            setCommunityFormValue("about", event.target.value)
          }
          error={Boolean(formErrors.about)}
          helperText={ formErrors.about && l(formErrors.about) }
          margin="dense"
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <span>
          {signUpCommunityForm.about.length}
          /250
        </span>
      </div>
      <Button
        variant="contained"
        color="primary"
        classes={{root: classes.button}}
        disabled={ signUpButtonDisabled }
        onClick={ () => {
          setGenericAuthorizationDialogType('communityData');
          doSignUp();
        } }
      >
        {l('user.update-profile.save')}
      </Button>
    </DialogContent>
  );
});
