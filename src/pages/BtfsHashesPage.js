import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { BtfsHashesTable } from '../Btfs/components';

const useStyles = makeStyles(() => ({
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
}));

export const BtfsHashesPage = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <AppBar currentActiveRoute="btfs" />
            </Grid>
            <Grid item xs={12}>
                <Layout>
                    <div className={classes.centered}>
                        <BtfsHashesTable />
                    </div>
                </Layout>
            </Grid>
        </Grid>
    );
};
