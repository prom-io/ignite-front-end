import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    layout: {
        width: '1170px',
        margin: 'auto',
      [theme.breakpoints.down('md')]: {
        width: '90%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  
}));

export const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.layout}>
            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
};
