import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  contentDescription: {
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '15px',
    lineHeight: '26px',
    color: '#1C1C1C',
    '& a': {
      textDecoration: 'underline',
      cursor: 'pointer',
      fontFamily: 'Museo Sans Cyrl Bold',
    }
  },
  contentBlock: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid #F1EBE8',
    marginTop: '16px',
    paddingTop: '24px',
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
  notes: {
    marginTop: '32px',
    marginBottom: 16,
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
    marginTop: 20,
  }
}));

export const ErrorAuthorization = () => {
  const classes = useStyles();
  return (
      <DialogContent>
        <span className={classes.contentDescription}>
          Something seems to go wrong…  Please contact us on <a onClick={() => window.open('http://ignite.so/')}>Ignite.so</a> or
          <a onClick={() => window.open('http://prometeus.so/')}>Prometeus.io</a>. We’ll do our best to fix the problem.
        </span>
        
        <div className={classes.contentBlock}>
          <p>Your login is:</p>
          <span>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
        </div>
        
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }}>
          Enjoy
        </Button>
        
        <div className={classes.notes}>
          <a>Note:</a> We created this network because we believe that every word is worth to be heard. That means Ignite does not control or censor anything you can publish or see here.
          If you don't like something, you will have options to unfollow, block or mute that person. However, please do not expect that we will ban somebody whose opinion you hate. For this option please consider Hezbollah or Facebook. Our Report abuse option is intended for emergency situations.
        </div>
  
        <span className={classes.contentDescription}>
        Sorry for the inconvenience.
        </span>
      </DialogContent>
  );
};