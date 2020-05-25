import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    notificationLeftMargin: {
        backgroundColor: '#FFFBF8',
        paddingLeft: theme.spacing(6),
    },
}));

export const NotificationLeftMargin = () => {
    const classes = useStyles();

    return <div className={classes.notificationLeftMargin} />;
};
