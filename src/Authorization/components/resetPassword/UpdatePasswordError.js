import { Button, DialogContent } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CustomDialogTitle } from '../CustomDialogTitle';

const useStyles = makeStyles(theme => ({
    dialogRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        fontFamily: 'Museo Sans Cyrl Bold',
    },
    button: {
        width: '187px',
        margin: '24px 0',
    },
}));

export const UpdatePasswordError = () => {
    const classes = useStyles();
    return (
        <DialogContent classes={{ root: classes.dialogRoot }}>
            <span>Your password does not fit to the hashcode from the transaction.</span>
            <Button variant="contained" color="primary" classes={{ root: classes.button }}>
                OK
            </Button>
        </DialogContent>
    );
};
