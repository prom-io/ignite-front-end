import { makeStyles } from '@material-ui/core/styles';
import { CopyIcon } from '../../icons/CopyIcon';
import React from 'react';

const useStyles = makeStyles(theme => ({
  key: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
    fontSize: '15px',
    fontFamily: 'Museo Sans Cyrl Regular',
    '& svg': {
      fill: '#FF5C01',
    },
  },
  keyTitle: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
  },
  keyValue: {
    wordWrap: 'break-word',
    marginTop: '6px',
  },
  titleBold: {
    width: '80%',
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '20px',
    lineHeight: '24px'
  },
}));

export const KeyCopyBlock = ({children, ...props}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.key}>
      <div className={classes.keyTitle}>
        <div className={classes.titleBold}>{props.title}</div>
        <span className={classes.keyValue}>{children}</span>
      </div>
      <span>{CopyIcon()}</span>
    </div>
  )
};