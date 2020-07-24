import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { AppBar } from '../AppBar/components';
import { Layout } from '../Layout';
import { BinanceSmartChainTable } from '../Explorer/components';

const useStyles = makeStyles(() => ({
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
}));

export const BinanceSmartChainPage = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <AppBar />
            <Grid item xs={12}>
                <Layout>
                    <div className={classes.centered}>
                        <BinanceSmartChainTable currentActiveRoute="binance-smart-chain" />
                    </div>
                </Layout>
            </Grid>
        </Grid>
    );
};
