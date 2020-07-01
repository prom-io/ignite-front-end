import React from 'react';
import { Grid } from '@material-ui/core';

import { FollowPeopleInput, FollowPeopleList } from '.';
import { BackButton } from '../../components/BackButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  followBackButton: {
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: 0,
      zIndex: 1100,
      width: '100%',
      background: theme.palette.background.paper,
    },
  }
}));

export const FollowPeopleContainer = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
        <Grid xs={12}>
          <div className={classes.followBackButton}>
            <BackButton title="follow-people" toHome />
          </div>
            <FollowPeopleInput />
            <FollowPeopleList />
        </Grid>
    </Grid>
)};
