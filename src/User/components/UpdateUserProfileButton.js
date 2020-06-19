import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'mobx-router';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Routes } from '../../routes';
import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    editButtonWrapper: {
        marginTop: '10px',
        marginBottom: '24px',
        textDecoration: 'none',
        maxWidth: '204px',
        height: '40px',
        width: '100%',

        '& button': {
            textTransform: "capitalize",
            width: '100%',
            height: '40px',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '30px',
            background: 'transparent',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '18px',
        },
    },
}));

const _UpdateUserProfileButton = ({ routerStore, l }) => {
    const classes = useStyles();

    return (
        <Link
            className={classes.editButtonWrapper}
            store={routerStore}
            view={Routes.userEdit}
        >
            <Button
                color="primary"
                variant="text"
            >
                {l('user.edit-profile')}
            </Button>
        </Link>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const UpdateUserProfileButton = localized(
    inject(mapMobxToProps)(observer(_UpdateUserProfileButton)),
);
