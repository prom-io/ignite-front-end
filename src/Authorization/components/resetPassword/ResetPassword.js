import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CustomDialogTitle from '../CustomDialogTitle';
import { Button, DialogContent } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  dialogRoot: {
    margin: '24px 62px 40px 62px',
  },
  contentDescription: {
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '26px',
    color: '#1C1C1C',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    width: '187px',
    marginTop: '40px',
    alignSelf: 'center',
  }
}));

export const ResetPassword = () => {
const classes = useStyles();

return (
  <>
    <CustomDialogTitle title={'Reset Password'}/>
    <DialogContent classes={{root:classes.dialogRoot}}>
       <span className={classes.contentDescription}>
          To continue the password reset procedure, enter the Wallet address and the Password recovery key (Private key)
        </span>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Wallet Address" />
        <TextField id="standard-basic" label="Private Key" />
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }}>
          Continue
        </Button>
      </form>
    </DialogContent>
  </>
)

};