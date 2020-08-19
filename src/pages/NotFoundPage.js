import React from 'react';
import { inject } from 'mobx-react';
import { Button, makeStyles } from '@material-ui/core';

import { AppBar } from '../AppBar/components';
import { localized } from '../localization/components';
import { Routes } from '../routes';

const useStyles = makeStyles(theme => ({
    notFound: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100px',
    },
    notFoundMainText: {
        marginTop: 40,
        fontFamily: 'Museo Sans Cyrl Bold',
        fontSize: '20px',
        color: theme.palette.text.main,
    },
    notFoundSecondaryText: {
        maxWidth: '347px',
        textAlign: 'center',
        fontFamily: 'Museo Sans Cyrl Regular',
        fontSize: '15px',
        lineHeight: '26px',
        color: theme.palette.text.secondary,
    },
    notFoundButtonBack: {
        marginTop: 24,
    },
}));

export const _NotFoundPage = ({ routerStore }) => {
    const classes = useStyles();
    return (
        <>
            <AppBar />
            <div className={classes.notFound}>
                <div className="not-found" />
                <div className={classes.notFoundMainText}>Oops! It looks like we don’t have such a page</div>
                <small className={classes.notFoundSecondaryText}>Are you sure the web site URL is correct? Get in touch with support</small>
                <Button
                    classes={{ root: classes.notFoundButtonBack }}
                    onClick={() => routerStore.router.goTo(Routes.home)}
                    variant="outlined"
                    disableElevation
                    color="primary"
                >
                    Go Back Home
                </Button>
            </div>
        </>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const NotFoundPage = localized(inject(mapMobxToProps)(_NotFoundPage));
