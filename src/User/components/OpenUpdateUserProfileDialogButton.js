import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'mobx-router';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Routes } from '../../routes';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    editButtonWrapper: {
        marginTop: '10px',
        marginBottom: '24px',
        textDecoration: 'none',
        maxWidth: '204px',
        height: '40px',
        width: '100%',

        '& button': {
            width: '100%',
            height: '40px',
            borderRadius: '30px',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '18px',
        },
    },
}));

const _OpenUpdateUserProfileDialogButton = ({ routerStore, l }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.editButtonWrapper}
            store={routerStore}
            view={Routes.userEdit}
        >
            <Button
                color="primary"
                variant="contained"
            >
                {l('user.update-profile')}
            </Button>
        </Link>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const OpenUpdateUserProfileDialogButton = localized(
    inject(mapMobxToProps)(observer(_OpenUpdateUserProfileDialogButton)),
);
