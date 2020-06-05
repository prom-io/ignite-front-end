import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    layout: {
        width: '1170px',
        margin: 'auto',
        marginTop: '70px',
        [theme.breakpoints.down('md')]: {
            width: '100%',
            maxWidth: '920px',
        },
        [theme.breakpoints.between('952', '959')]: {
            marginTop: '70px !important',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: '0px',
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
