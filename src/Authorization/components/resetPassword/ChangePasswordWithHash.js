import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import CustomDialogTitle from '../CustomDialogTitle';
import { InputPasswordGroup } from '../InputPasswordGroup';
import { KeyCopyBlock } from '../KeyCopyBlock';
import { _Checkbox } from '../_Checkbox';

const useStyles = makeStyles(theme => ({
  dialogContentRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '187px',
    marginTop: 40,
    alignSelf: 'center',
  },
  checkbox: {
    marginTop: '30px',
  },
  descriptionBold: {
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '15px',
  }
}));

export const ChangePasswordWithHash = ({submissionError,l}) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    copied: false,
  });
  
  return (
    <>
      <CustomDialogTitle title={'Change Your Password'}/>
      <DialogContent classes={{
        root: classes.dialogContentRoot
      }}>
        <span className={classes.descriptionBold}>Set a new password for your Ignite account</span>
        
        <InputPasswordGroup values={values} setValues={setValues} title={'Password'}/>
        
        <KeyCopyBlock title={'A hashcode for this password'} type={'disable'}>
          Hashcode not generated
        </KeyCopyBlock>
        
        <_Checkbox className={classes.checkbox}>I have saved the hashcode to publish it later in a record in Ethereum blockchain</_Checkbox>
        
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }} >
          Continue
        </Button>
      </DialogContent>
    </>
  )
}