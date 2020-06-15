import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  topicsHashButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    marginRight: '4px',
    borderRadius: '30px',
    fontFamily: 'Museo Sans Cyrl Regular',
    backgroundColor: theme.palette.text.main,
    color: theme.palette.background.paper
  }
}));

const TopicsHashButton = ({children, ...props}) => {
const classes = useStyles();
  return (
    <div className={classes.topicsHashButton}>
      {children}
    </div>
  )
};

export default TopicsHashButton;