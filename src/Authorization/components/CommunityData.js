import React  from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, TextField, Typography, Grid } from '@material-ui/core';
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
      <Typography classes={{root:classes.contentDescription}}>
        {l('sign-up.community-about')}
      </Typography>
      <div className={classes.link} style={{marginTop: 15}}>What is community?</div>
      
      <Grid container spacing={3} style={{alignItems: 'center'}}>
        <Grid item xs={4}>
          <UserAvatarFileInput />
        </Grid>
        
        <Grid item xs={8}>
          <div
            className={classes.updateUserProfileField}
            style={{ marginTop: "20px" }}
          >
            <TextField
              label={l("user.name")}
              placeholder="Name"
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
              label={l("user.about")}
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
            style={{marginTop: 20}}
            disabled={ signUpButtonDisabled }
            onClick={ () => {
              setGenericAuthorizationDialogType('communityData');
              doSignUp();
            } }
          >
            {l('user.update-profile.save')}
          </Button>
        </Grid>
      </Grid>
    </DialogContent>
  );
});
