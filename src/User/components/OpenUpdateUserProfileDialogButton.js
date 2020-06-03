import React from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@material-ui/core';
import { localized } from '../../localization/components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    buttonRoot: {
        marginTop: '10px',
        marginBottom: '24px'
    }
}));

const _OpenUpdateUserProfileDialogButton = ({ setUpdateUserProfileDialogOpen, l }) => {
    const classes = useStyles();
    return (
    <Button
        color="primary"
        variant="outlined"
        classes={{root:classes.buttonRoot}}
        onClick={() => setUpdateUserProfileDialogOpen(true)}
    >
        {l('user.update-profile')}
    </Button>
)};

const mapMobxToProps = ({ userProfileUpdate }) => ({
    setUpdateUserProfileDialogOpen: userProfileUpdate.setUpdateUserProfileDialogOpen,
});

export const OpenUpdateUserProfileDialogButton = localized(
    inject(mapMobxToProps)(observer(_OpenUpdateUserProfileDialogButton)),
);
