import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    layout: {
        maxWidth: 1180,
        [theme.breakpoints.up('lg')]: {
            margin: 'auto',
        },
    },
}));

export const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.layout}>
            {children}
        </Grid>
    );
};
