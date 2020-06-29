import React from 'react';
import { inject } from 'mobx-react';
import { Typography, makeStyles } from '@material-ui/core';

import { ArrowBackIcon } from '../icons/ArrowBackIcon';
import { localized } from '../localization/components';
import { Routes } from '../routes';

const useStyles = makeStyles((theme) => ({
    backButtonWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    backButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        height: '32px',
        width: '32px',
        marginRight: '4px',
        borderRadius: '30px',
        [theme.breakpoints.down('sm')]: {
            height: '48px',
            width: '48px',
        },

        '&:hover': {
            background: 'rgba(255, 92, 1, 0.2)',
            borderRadius: '30px',
        },
    },
    backButtonTitle: {
        fontWeight: 600,
        fontSize: '20px',
        lineHeight: '24px',
        margin: 0,
    },
}));

const _BackButton = ({ title, toHome, toTopics, params, routerStore, l }) => {
    const classes = useStyles();
    
    return (
        <div className={classes.backButtonWrapper}>
            <div
                onClick={() => {
                    if (toHome) {
                        routerStore.router.goTo(Routes.home);
                    } else if (toTopics) {
                        routerStore.router.goTo(Routes.topics);
                    } else {
                        window.history.back();
                    }
                }}
                className={classes.backButton}
            >
                <ArrowBackIcon />
            </div>
            <Typography>
                <h2 className={classes.backButtonTitle}>
                    {toTopics ? `${l('topics.tag')} #${params}` : l(title)}
                </h2>
            </Typography>
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const BackButton = localized(inject(mapMobxToProps)(_BackButton));
