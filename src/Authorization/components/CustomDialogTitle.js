import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CloseIcon } from '../../icons/CloseIcon';
import { AttentionIcon } from '../../icons/AttentionIcon';

const useStyles = makeStyles(theme => ({
  titleBlock: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '24px',
    background: '#FFFBF8',
    fontFamily: 'Museo Sans Cyrl Bold',
    fontSize: '28px',
  },
  titleHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
    marginLeft: 32,
  },
  text: {
    marginLeft: 24,
  },
  closeIcon: {
    '& svg': {
      stroke: '#A1A1A1',
      marginBottom: '18px',
    }
  }
}));

const CustomDialogTitle = ({title, type}) => {
  const classes = useStyles();
  return (
      <div className={classes.titleBlock}>
        <div className={classes.titleHeader}>
          { type === 'attention' ?
            <a rel="noopener noreferrer" className={ classes.logoIcon }>
            { AttentionIcon() }
            </a> :
            <a rel="noopener noreferrer" className={ classes.logoIcon }>
            <div className="header-logo"/>
            </a>
          }
          <span className={classes.text}>{title}</span>
        </div>
        <span className={classes.closeIcon}>{CloseIcon()}</span>
      </div>
  )
 };

export default CustomDialogTitle;