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
    '& a': {
      textDecoration: 'underline',
      cursor: 'pointer',
    }
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
  descriptionBold: {
    margin: '16px 0',
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '15px',
  },
  notes: {
    marginTop: '12px',
    color: '#A2A2A2',
    fontFamily: 'Museo Sans Cyrl Regular',
    lineHeight: '26px',
    '& a': {
      color: '#FF5C01',
      cursor: 'pointer',
      fontFamily: 'Museo Sans Cyrl Bold',
    }
  },
  button: {
    width: '187px',
    marginTop: '20px',
  },
}));

export const PasswordUpdatedError = () => {
  const classes = useStyles();
  return (
    <>
      <CustomDialogTitle title={'Oops!'}/>
      <DialogContent>
        <div className={classes.contentDescription}>
          Something seems to go wrong…  Please contact us on <a onClick={() => window.open('http://ignite.so/')}>Ignite.so</a> or
          <a onClick={() => window.open('http://prometeus.so/')}>Prometeus.io</a>. We’ll do our best to fix the problem.
        </div>
        
        <div className={classes.contentBlock}>
          <p>Your login is</p>
          <span>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
        </div>
  
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }}>
          Ok
        </Button>
  
        <div className={classes.notes}>
          <a>Note:</a> Please keep your login (Wallet Address) and be ready to provide us with it.
          Time and date, as well as your device and browser info will be also useful.
          We will not ask about your IP address and location, but sometime it may help...
          so we would highly appreciate it if you could provide us with that info.
        </div>
  
        <div className={classes.descriptionBold}>
          Sorry for the inconvenience.
        </div>
      </DialogContent>
    </>
  );
};