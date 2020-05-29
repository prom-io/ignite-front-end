import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  contentDescription: {
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#1C1C1C',
  },
  contentBlock: {
    margin: '16px 0 24px 0',
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '26px',
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
  },
  link:{
    marginTop: '30px',
    color: '#FF5C01',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '18px',
  }
}));

export const CreateAccount = () => {
  const classes = useStyles();
  return (
      <DialogContent>
        <span className={classes.contentDescription}>
         Creating an Ignite account based on existing ETH Wallet
        </span>
  
        <div className={classes.contentBlock}>
          If you don't want to share your Private Key with anybody including Ignite, you can use previously created ETH
          Wallet for your new Ignite account. It will prevent any security issues but you will need to publish a record to
          Ethereum blockchain that contains the hashcode (to the password).
          We can help you generate a hashcode for your password or you can do this on your own.
        </div>
  
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }}>
          Generate Hashcode
        </Button>
  
        <div className={classes.link}>I will create the hashcode on my own</div>
  
        <div className={classes.notes}>
          <a>Note:</a> If you’d like to create the password and generate a hashcode for it,
          please note that we use standard Niels Provos and David Mazières bcrypt password hashing function.
        </div>
      </DialogContent>
  );
};