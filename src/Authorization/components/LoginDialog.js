import React from 'react';
import { inject, observer } from 'mobx-react';
import { Dialog, withMobileDialog } from '@material-ui/core';
import { UpdatePasswordError } from './resetPassword/UpdatePasswordError';
import CustomDialogTitle from './CustomDialogTitle';
import { SignUp } from './SignUp';
import { CreateWallet } from './CreateWallet';
import { Attention } from './Attention';
import { Welcome } from './Welcome';
import { ErrorAuthorization } from './ErrorAuthorization';
import { CreateAccount } from './CreateAccount';
import { GenerateHash } from './GenerateHash';
import { Verify } from './Verify';
import { ErrorVerify } from './ErrorVerify';
import { ResetPassword } from './resetPassword/ResetPassword';
import { ForgotPassword } from './resetPassword/ForgotPassword';
import { ChangePassword } from './resetPassword/ChangePassword';
import { PasswordUpdated } from './resetPassword/PasswordUpdated';
import { PasswordUpdatedError } from './resetPassword/PasswordUpdatedError';
import { ChangePasswordWithHash } from './resetPassword/ChangePasswordWithHash';
import { ResetWithoutKey } from './resetPassword/ResetWithoutKey';

/**Список всех возможных диалоговых окон для регистрации и восстановления пароля*/
const dialogType = {
  signUp: {
    id: 'signUp',
    component: <SignUp/>,
    title: 'Sign Up',
    type: 'default', // в зависимости от type меняеться иконка в dialogHeader. Возможные варианты: default, attention
  },
  createWallet: {
    id: 'createWallet',
    component: <CreateWallet/>,
    title: 'Wallet Created',
    type: 'default',
  },
  attention: {
    id: 'attention',
    component: <Attention/>,
    title: 'Attention',
    type: 'attention',
  },
  welcome: {
    id: 'welcome',
    component: <Welcome/>,
    title: 'Welcome to Ignite!',
    type: 'default',
  },
  errorAuthorization: {
    id: 'errorAuthorization',
    component: <ErrorAuthorization/>,
    title: 'Oops!',
    type: 'default',
  },
  createAccount: {
    id: 'createAccount',
    component: <CreateAccount/>,
    title: 'Create an Account',
    type: 'default',
  },
  generateHash: {
    id: 'generateHash',
    component: <GenerateHash/>,
    title: 'Generate a Hashcode',
    type: 'default',
  },
  verifyHash: {
    id: 'verifyHash',
    component: <Verify/>,
    title: 'Verify hashcode',
    type: 'default',
  },
  verifyError: {
    id: 'verifyError',
    component: <ErrorVerify/>,
    title: 'Oops!',
    type: 'default',
  },
  forgotPassword: {
    id: 'forgotPassword',
    component: <ForgotPassword/>,
    title: 'Forgot your Password?',
    type: 'default',
  },
  resetPassword: {
    id: 'resetPassword',
    component: <ResetPassword/>,
    title: 'Reset Password',
    type: 'default',
  },
  changePassword: {
    id: 'changePassword',
    component: <ChangePassword/>,
    title: 'Change Your Password',
    type: 'default',
  },
  passwordUpdated: {
    id: 'passwordUpdated',
    component: <PasswordUpdated/>,
    title: 'Password Updated',
    type: 'default',
  },
  passwordUpdatedError: {
    id: 'passwordUpdatedError',
    component: <PasswordUpdatedError />,
    title: 'Oops!',
    type: 'default',
  },
  updatePasswordError: {
    id: 'updatePasswordError',
    component: <UpdatePasswordError />,
    title: 'Oops!',
    type: 'default',
  },
  resetWithoutKey: {
    id: 'resetWithoutKey',
    component: <ResetWithoutKey/>,
    title: 'Reset Password',
    type: 'default',
  },
  changePasswordWithHash: {
    id: 'changePasswordWithHash',
    component: <ChangePasswordWithHash/>,
    title: 'Change Your Password',
    type: 'default',
  },
};

const _LoginDialog = ({ loginDialogOpen, setLoginDialogOpen, fullScreen, setSignUpDialogOpen }) => {
    return (
      <Dialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        fullScreen={fullScreen}
        fullWidth
        scroll={'body'}
      >
        /*В заголовке title тоже берться из меняющегося компонента*/
        <CustomDialogTitle title={dialogType.createWallet.title} setLoginDialogOpen={setLoginDialogOpen}/>
        <CreateWallet/> /** Изменяющийся контент */
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
