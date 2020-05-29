import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import CustomDialogTitle from './CustomDialogTitle';

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
      fontFamily: 'Museo Sans Cyrl Bold',
    }
  },
  contentBlock: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '16px',
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
  },
  content: {
  margin: '24px 0 40px 0'
  }
}));

export const ErrorVerify = () => {
  const classes = useStyles();
  return (
      <DialogContent>
        <div className={classes.contentDescription}>
          Your password does not fit to the hashcode from the transaction. Please contact us on
          <a onClick={() => window.open('http://ignite.so/')}>Ignite.so</a> or
          <a onClick={() => window.open('http://prometeus.so/')}>Prometeus.io</a>.
        </div>
        
        <div className={classes.content}>
          <div className={classes.contentBlock}>
            <p>Your Tx Id is</p>
            <span>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
          </div>
          <div className={classes.contentBlock}>
            <p>Your Wallet Address is</p>
            <span>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
          </div>
          <div className={classes.contentBlock}>
            <p>Your Hashcode is</p>
            <span>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
          </div>
        </div>
  
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }}>
          Enjoy
        </Button>
      </DialogContent>
  );
};