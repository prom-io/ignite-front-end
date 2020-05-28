import React from 'react';
import { inject, observer } from 'mobx-react';
import { Dialog, withMobileDialog } from '@material-ui/core';
import { UpdatePasswordError } from './resetPassword/UpdatePasswordError';

const _LoginDialog = ({ loginDialogOpen, setLoginDialogOpen, fullScreen, setSignUpDialogOpen }) => {
    return (
      <Dialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        fullScreen={fullScreen}
        fullWidth
        scroll={'body'}
      >
          <UpdatePasswordError />
      </Dialog>
    );
};

const mapMobxToProps = ({ login, signUp }) => ({
    setLoginDialogOpen: login.setLoginDialogOpen,
    loginDialogOpen: login.loginDialogOpen,
    setSignUpDialogOpen: signUp.setSignUpDialogOpen,
});

export const LoginDialog = withMobileDialog()(
    inject(mapMobxToProps)(observer(_LoginDialog)),
);
