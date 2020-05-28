import React from 'react';
import { Button, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { InputPasswordGroup } from '../InputPasswordGroup';
import CustomDialogTitle from '../CustomDialogTitle';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    margin: '24px 62px 40px 62px',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '187px',
    alignSelf: 'center',
    marginTop: '40px',
  },
  titleBold: {
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '15px',
    lineHeight: '26px',
  }
}));

export const ChangePassword = () => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
    copied: false,
  });
  return (
    <>
      <CustomDialogTitle title={'Change Your Password'}/>
      <DialogContent classes={{root:classes.dialogRoot}}>
        <span className={classes.titleBold}>Set a new password for your Ignite account</span>
        <InputPasswordGroup title={'Password'} values={values} setValues={setValues}/>
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }}>
          Continue
        </Button>
      </DialogContent>
    </>
  )
};