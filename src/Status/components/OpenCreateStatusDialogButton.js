import React from 'react';
import { inject, observer } from 'mobx-react';
import { Hidden, IconButton, makeStyles } from '@material-ui/core';
import { EditIcon } from '../../icons/EditIcon';

const userStyles = makeStyles(theme => ({
    openCreateStatusDialogButton: {
        backgroundColor: theme.palette.primary.main,
        marginLeft: 0,
    },
}));

const _OpenCreateStatusDialogButton = ({ setCreateStatusDialogOpen }) => {
    const classes = userStyles();

    return (
        <IconButton
            className={classes.openCreateStatusDialogButton}
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
