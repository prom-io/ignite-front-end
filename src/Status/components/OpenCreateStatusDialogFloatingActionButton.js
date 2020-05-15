import React from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, makeStyles } from '@material-ui/core';
import { EditIcon } from '../../icons/EditIcon';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(8),
        right: theme.spacing(2),
        zIndex: 900000,
    },
}));

const _OpenCreateStatusDialogFloatingActionButton = ({ setCreateStatusDialogOpen }) => {
    const classes = useStyles();

    return (
        <Fab
            color="primary"
            onClick={() => setCreateStatusDialogOpen(true)}
            className={classes.fab}
        >
            <EditIcon />
        </Fab>
    );
};

const mapMobxToProps = ({ createStatus }) => ({
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen,
});

export const OpenCreateStatusDialogFloatingActionButton = inject(mapMobxToProps)(observer(_OpenCreateStatusDialogFloatingActionButton));
