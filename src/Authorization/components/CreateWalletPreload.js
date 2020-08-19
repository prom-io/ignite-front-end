import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Button, DialogContent, useTheme } from '@material-ui/core';
import { FadeLoader } from 'react-spinners';
import { useLocalization, useStore } from '../../store/hooks';
import { DoneIcon } from '../../icons/DoneIcon';
import {authorizationDialogsStyles} from '../../styles/material/authorizationDialogsStyles'

const walletGenerationSuccessTranslations = {
  en: (classes) => (
    <span className={classes.contentDescription}>
      <p>Account creation in progress</p>
      {' '}
      <p className={classes.marginTop}>Please do not close this page</p>
      We are making a record to the blockchain now. It can take some time, so please be patient.
      It is necessary to provide both security and anonymity to you with your new account.
    </span>
  ),
  kr: (classes) => (
    <span className={classes.contentDescription}>
            당신의 블록체인 지갑과 개인 키가 성공적으로 만들어졌다.
            <br />
            <a> 지갑 주소</a>
            와 개인 키를 저장하여 안전한 곳에 보관하십시오.
        </span>
  ),
};

export const CreateWalletPreload = observer(() => {
  const [savedEverything] = useState(false);
  const [agreedToPolicy] = useState(false);
  const classes = authorizationDialogsStyles();
  const theme = useTheme();
  const { l, locale } = useLocalization();
  const { signUp, genericAuthorizationDialog } = useStore();
  const {
    pending,
  } = signUp;
  
  const signUpButtonDisabled = pending;
  const { setGenericAuthorizationDialogType, genericAuthorizationDialogTempType } = genericAuthorizationDialog;
  
  return (
    <DialogContent classes={{
      root: classes.dialogContentRoot,
    }}
    >
      {walletGenerationSuccessTranslations[locale](classes)}
      {pending ?
      <span className={classes.loader}><FadeLoader color={theme.palette.primary.main}/></span> :
        <DoneIcon className={classes.doneIcon}/>
      }

      <Button
        variant="contained"
        color="primary"
        classes={{
          root: classes.button,
        }}
        disabled={signUpButtonDisabled}
        onClick={()=>setGenericAuthorizationDialogType(genericAuthorizationDialogTempType)}
      >
        {l('sign-up.continue')}
      </Button>
    </DialogContent>
  );
});
