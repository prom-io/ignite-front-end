import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    userProfileTab: {
        cursor: 'pointer',
        flex: '1 1 auto',
        color: theme.palette.text.secondary,
    },
    userProfileActiveTab: {
        borderBottom: `2px solid ${theme.primary.main}`,
        cursor: 'pointer',
        flex: '1 1 auto',
        color: theme.palette.text.main,
        '&.MuiTypography-colorTextSecondary p': {
            color: theme.palette.text.main,
        },
    },
}));

export const UserProfileTab = ({ header, subheader, active, onSelectActive }) => {
    const classes = useStyles();

    return (
        <div
            className={active ? classes.userProfileActiveTab : classes.userProfileTab}
            onClick={onSelectActive}
        >
            <Typography variant="h6">
                {header}
            </Typography>
            <Typography variant="body1">
                {subheader}
            </Typography>
        </div>
    );
};
