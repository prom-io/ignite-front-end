import React from 'react';
import { makeStyles } from '@material-ui/core';

import { UpdateUserProfile, UpdateUserPassword } from '.';

const useStyles = makeStyles(theme => ({
    updateUserContainer: {
        position: 'relative',
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: '4px',
        background: theme.palette.border.main,
    },
    updateUserContainerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '108px',
        background: theme.palette.background.light,
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
