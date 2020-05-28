import React from 'react';
import CustomDialogTitle from '../CustomDialogTitle';
import { Button, DialogContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  contentDescription: {
    paddingBottom: '16px',
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '15px',
    lineHeight: '26px',
    color: '#1C1C1C',
    borderBottom: '1px solid #F1EBE8',
  },
  contentBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '24px',
    fontFamily: 'Museo Sans Cyrl Regular',
    '& p': {
      margin: 0,
      fontFamily: 'Museo Sans Cyrl Bold',
      fontSize: '20px',
      lineHeight: '18px',
    },
    '& span': {
      marginTop: 8,
      fontSize: '15px',
    }
  },
  button: {
    width: '187px',
    marginTop: '40px',
    alignSelf: 'center'
  },
}));

export const PasswordUpdated = () => {
  const classes = useStyles();
  return (
    <>
      <CustomDialogTitle title={'Password Updated'}/>
      <DialogContent>
        <div className={classes.contentDescription}>
          Your password has been successfully changed. Use your new password to log in.
        </div>
  
        <div className={classes.contentBlock}>
          <p>Your login is</p>
          <span>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
  
          <Button variant="contained" color="primary" classes={{
            root: classes.button
          }}>
            Ok
          </Button>
        </div>
      </DialogContent>
    </>
  );
};