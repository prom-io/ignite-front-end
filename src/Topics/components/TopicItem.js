import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/core/SvgIcon/SvgIcon';

const useStyles = makeStyles((theme) => ({
  topicItemBody: {
    display: 'flex',
    flexDirection: 'column',
    minWidth:'256px',
    padding: '12px 16px',
    borderTop: `1px solid ${theme.palette.border.main}`,
    fontSize: '15px',
    fontFamily: 'Museo Sans Cyrl Regular',
    color: theme.palette.text.main,
  },
  topicItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  topicItemFooter:{
    color: theme.palette.text.secondary,
  }
}));

const _TopicItem = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div className={classes.topicItemBody}>
      <div className={classes.topicItemHeader}>
        <p>#Topic title</p>
        <ArrowDropDownIcon
          style={{ color: theme.palette.text.secondary }}
          classes={{
            root: open && classes.arrowAnimate,
          }}
        />
      </div>
      <div className={classes.topicItemFooter}>556 posts</div>
    </div>
  )
};