import React from 'react';
import { Button, DialogContent, makeStyles } from '@material-ui/core';
import CustomDialogTitle from './CustomDialogTitle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  contentBlock: {
    margin: '16px 0 30px 0',
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '26px',
  },
  notes: {
    marginTop: '24px',
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
}));

export const Verify = () => {
  const classes = useStyles();
  return (
    <>
      <CustomDialogTitle title={'Verify hashcode'}/>
      <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Ethereum Txn Hash" />
        
        <div className={classes.contentBlock}>
          Publish a record to Ethereum blockchain that contains the
          necessary hashcode and enter it’s Txn Hash here. We will create an Ignite account connected to that ETH wallet.
        </div>
        
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }}>
          Verify hash
        </Button>
        </form>
        
        <div className={classes.notes}>
          <a>Note:</a> If you’d like to generate a hashcode for it on your own,
          please note that we use standard Niels Provos and David Mazières bcrypt password hashing function.
        </div>
      </DialogContent>
    </>
  );
};