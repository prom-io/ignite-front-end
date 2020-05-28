import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import CustomDialogTitle from './CustomDialogTitle';
import { InputPasswordGroup } from './InputPasswordGroup';
import { KeyCopyBlock } from './KeyCopyBlock';
import { _Checkbox } from './_Checkbox';

const useStyles = makeStyles(theme => ({
  dialogContentRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentDescription: {
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '26px',
    color: '#1C1C1C',
    '& a': {
      color: '#FF5C01',
    }
  },
  loginInput: {
    display: 'flex',
    maxWidth: '375px',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    width: '187px',
    marginTop: 40,
    alignSelf: 'center',
  },
  content: {
    margin: '30px 0 12px 0',
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '26px',
    color: '#1C1C1C',
  },
}));

export const CreateWallet = ({submissionError,l}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    copied: false,
  });
  
  return (
    <>
      <CustomDialogTitle title={'Wallet Created'}/>
      <DialogContent classes={{
        root: classes.dialogContentRoot
      }}>
        <span className={classes.contentDescription}>
          Your blockchain wallet and private key were successfully created.<br/>
          <a>Please save</a> the wallet address and private key and keep them in a safe place.
        </span>
  
        <KeyCopyBlock title={'Wallet Address (login)'}>
          0xCBC41d42518F6614bcaf4C82587B19001af2E12F
        </KeyCopyBlock>
  
        <InputPasswordGroup values={values} setValues={setValues} title={'Password'}/>
  
        <KeyCopyBlock title={'Private Key (password recovery key)'}>
          3e6684c36848f43cd8f23487ebc45c8521a322852744765f7cbb06680caa6f93
        </KeyCopyBlock>
  
        <p className={classes.content}>
          We believe that privacy is a personal right so do not ask for your email or any personal information.
          However, that makes us unable to recover the password if you lose your private key.
        </p>
  
        <_Checkbox>I have saved my Wallet Address(login), password and Private Key (password recovery key).</_Checkbox>
        <_Checkbox>I am over 16 years old and have read and understood the Terms of Use and Privacy Policy.</_Checkbox>
  
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }} >
          Sign up
        </Button>
      </DialogContent>
      </>
  )
}