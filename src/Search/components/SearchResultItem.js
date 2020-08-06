import { Link } from 'mobx-router';
import { Routes } from '../../routes';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { routerStore } from '../../store';
import { Avatar, Typography } from '@material-ui/core';
import { trimString } from '../../utils/string-utils';
import { inject } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  postLink: {
    display: 'flex',
    padding: '15px 0',
  },
  followPeopleItemAvatar: {
    marginRight: 12,
    height: 35,
    width: 35,
  },
  followPeopleItemContent: {
    width: '100%',
    
    '& > p': {
      fontWeight: 300,
      fontSize: '13px',
      lineHeight: '16px',
      margin: '4px 0 0',
      color: theme.palette.text.main,
    },
  },
  followPeopleItemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    
    '& p': {
      fontWeight: 600,
      fontSize: '15px',
      lineHeight: '18px',
      textDecoration: 'none',
      color: theme.palette.text.main,
    },
    
    '& small': {
      fontWeight: 300,
      fontSize: '15px',
      lineHeight: '18px',
      color: theme.palette.text.secondary,
    },
  },
}));

const _SearchResultItem = ({user}) => {
  const classes = useStyles();
  return (
    <Link
      className={classes.postLink}
      key={user.id}
      view={Routes.userProfile}
      params={{ username: user.username }}
      store={routerStore}
    >
      <Avatar
        className={classes.followPeopleItemAvatar}
        src={
          user.avatar
          || 'http://localhost:3000/avatars/original/missing.png'
        }
      />
      <div className={classes.followPeopleItemContent}>
        <div className={classes.followPeopleItemRow}>
          <Typography>
            <div>{trimString(user.display_name, 16)}</div>
            <small>
              @
              {trimString(user.username, 16)}
            </small>
          </Typography>
        </div>
      </div>
    </Link>
  )
};

const mapMobxToProps = ({ store }) => ({
  routerStore: store,
});

export const SearchResultItem = inject(mapMobxToProps)(_SearchResultItem);

