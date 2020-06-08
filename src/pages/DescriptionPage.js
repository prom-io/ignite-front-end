import React from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { inject } from 'mobx-react';
import { Link } from 'mobx-router';
import { Routes } from '../routes';
import { DescriptionLinks } from '../components/DescriptionLinks';


const useStyles = makeStyles(theme => ({
    prometeusLink: {
        color: theme.palette.primary.main,
    },
}));

const pageHeight = document.documentElement.clientHeight;


const _DescriptionPage = ({ routerStore }) => {
    const classes = useStyles();

    const PrometeusNetwork = '{Prometeus Network}';

    return (
        <div className="description-page">
            <div className="arrow-go-home">
                <Link view={Routes.home} store={routerStore}>
                    <img src="./arrow-go-back.png" />
                </Link>
            </div>
            <Grid container spacing={2} className="description-container">
                <Grid item>
                    <Typography variant="body2">
                        Try
                        {' '}
                        <a className={classes.prometeusLink} href="https://prometeus.io" target="_blank noopener noreferrrer">{PrometeusNetwork}</a>
                        , which allows to buy and sell any imaginable digital data: contract templates, music, 3D models, source codes, stats or your master's thesis – anything you can think of, saved in a file.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        <span>Ignite </span>
                        {' '}
                        is Ethereum Plasma based 'decentralized twitter' solution with immutable storage to make it censorship proof.
                    </Typography>
                </Grid>
                <Grid item>
                    <DescriptionLinks />
                </Grid>
            </Grid>
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const DescriptionPage = inject(mapMobxToProps)(_DescriptionPage);
