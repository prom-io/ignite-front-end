import React from 'react';
import { Button, Dialog, DialogContent, makeStyles } from '@material-ui/core';
import CustomDialogTitle from './CustomDialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import { CopyIcon } from '../../icons/CopyIcon';

const useStyles = makeStyles(theme => ({
  dialogContentRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentDescription: {
    margin: '0',
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '20px',
    lineHeight: '26px',
    color: '#1C1C1C',
    '& span': {
      color: '#FF5C01',
    }
  },
  infoCheckingBlock: {
    margin: '16px 0 24px 0',
    borderBottom: '1px solid #F1EBE8',
  },
  markList:{
    marginTop: 24,
    fontFamily: 'Museo Sans Cyrl Regular',
    fontSize: '15px',
    lineHeight: '24px',
    '& span': {
      color: '#FF5C01',
    },
    '& ul': {
      padding: '0 16px',
      margin: 0,
      '& li': {
        margin:'8px 0',
      },
      '& li::marker':{
        color: '#A2A2A2',
      }
    }
  },
  checkboxBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderTop: '1px solid #F1EBE8',
    padding: '12px 0 16px 0',
  },
  checkboxBlockDescription: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 15,
    marginLeft: 24,
  },
  checkboxTitle: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Museo Sans Cyrl Bold',
  },
  value: {
    marginTop: 8,
    fontFamily: 'Museo Sans Cyrl Regular',
  },
  button: {
    width: '187px',
    marginTop: 40,
    alignSelf: 'center',
  },
  checkbox: {
    padding: 0,
    height: 'fit-content',
  }
}));

export const Attention = () => {
  const classes = useStyles();
  return (
    <>
      <CustomDialogTitle title={'Attention'} type={'attention'}/>
      <DialogContent classes={{
        root: classes.dialogContentRoot
      }}>
        <p className={classes.contentDescription}>
          Make sure you <span>really</span> saved this info:
        </p>
        
        <div className={classes.infoCheckingBlock}>
          <div className={classes.checkboxBlock}>
            <div className={classes.checkboxTitle}>
              <Checkbox color={'primary'} classes={{root:classes.checkbox}}/>
              <div className={classes.checkboxBlockDescription}>
                <span className={classes.title}>Wallet Address (login)</span>
                <span className={classes.value}>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
              </div>
            </div>
            <span>{CopyIcon()}</span>
          </div>
          <div className={classes.checkboxBlock}>
            <div className={classes.checkboxTitle}>
              <Checkbox color={'primary'} classes={{root:classes.checkbox}}/>
              <div className={classes.checkboxBlockDescription}>
                <span className={classes.title}>Private Key (password recovery key)</span>
                <span className={classes.value}>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
              </div>
            </div>
            <span>{CopyIcon()}</span>
          </div>
          <div className={classes.checkboxBlock}>
            <div className={classes.checkboxTitle}>
              <Checkbox color={'primary'} classes={{root:classes.checkbox}}/>
              <div className={classes.checkboxBlockDescription}>
                <span className={classes.title}>Password</span>
                <span className={classes.value}>0xCBC41d42518F6614bcaf4C82587B19001af2E12F</span>
              </div>
            </div>
            <span>{CopyIcon()}</span>
          </div>
        </div>
        
        <div className={classes.markList}>
          <p className={classes.contentDescription}>
          Please do not lose it!
        </p>
          <ul>
            <li>Make <span>100%</span> sure that you really saved all this info in a safe place</li>
            <li>You will be able to change the password later using the Private Key</li>
            <li>If you lose your Private Key, you will <span>never</span> recover the password</li>
          </ul>
        </div>
       
        <Button variant="contained" color="primary" classes={{
          root: classes.button
        }} >
          Ok
        </Button>
      </DialogContent>
    </>
  )
};