import React from 'react';
import { makeStyles } from '@material-ui/core';

import { UpdateUserProfile, UpdateUserPassword } from '.';

const useStyles = makeStyles(theme => ({
    updateUserContainer: {
        position: 'relative',
        border: '1px solid #F1EBE8',
        borderRadius: '4px',
        background: '#F1EBE8',
    },
    updateUserContainerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '108px',
        background: '#FFFBF8',
        [theme.breakpoints.down('sm')]: {
            height: '245px',
        },
    },
}));

export const UpdateUserContainer = () => {
    const classes = useStyles();

    return (
        <div className={classes.updateUserContainer}>
            <div className={classes.updateUserContainerBackground} />
            <UpdateUserProfile />
            <UpdateUserPassword />
        </div>
    );
};
