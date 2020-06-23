import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { EthereumMainnetTable } from '../Explorer/components';

const useStyles = makeStyles(() => ({
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
}));

export const EthereumMainnetPage = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <AppBar />
            <Grid item xs={12}>
                <Layout>
                    <div className={classes.centered}>
                        <EthereumMainnetTable currentActiveRoute="ethereum-mainnet" />
                    </div>
                </Layout>
            </Grid>
        </Grid>
    );
};
