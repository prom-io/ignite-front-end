import React from 'react';
import { inject, observer } from 'mobx-react';
import { Hidden, IconButton, makeStyles } from '@material-ui/core';
import { EditIcon } from '../../icons/EditIcon';

const userStyles = makeStyles(theme => ({
    openCreateStatusDialogButton: {
        width: '34px',
        height: '34px',
        backgroundColor: theme.palette.primary.main,
        margin: '0 16px',
        '&>span': {
            width: '34px',
            height: '34px',
        }
    },
}));

const _OpenCreateStatusDialogButton = ({ setCreateStatusDialogOpen }) => {
    const classes = userStyles();

    return (
        <IconButton
            classes={{root:classes.openCreateStatusDialogButton}}
            onClick={() => setCreateStatusDialogOpen(true)}
        >
            <EditIcon />
        </IconButton>
    );
};

const mapMobxToProps = ({ createStatus }) => ({
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen,
});

export const OpenCreateStatusDialogButton = inject(mapMobxToProps)(observer(_OpenCreateStatusDialogButton));
