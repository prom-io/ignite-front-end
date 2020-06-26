import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    followBtn: {
        borderRadius: '30px',
        fontSize: '15px',
        fontWeight: 600,
        lineHeight: '18px',

        '&.following': {
            color: theme.palette.primary.main,
            border: 'none',
            background: 'rgba(255, 92, 1, 0.2)',
        },

        '&.unfollow': {
            border: `1px solid ${theme.palette.primary.main}`,
            background: theme.palette.primary.main,
            color: '#fff',
        },
    },
}));

const _UserProfileHeaderButton = ({ username, onUnfollowRequest, l }) => {
    const classes = useStyles();
    const [statusBtn, setStatusBtn] = useState('following');

    const handleMouseEnter = () => {
        if (statusBtn === 'following') {
            setStatusBtn('unfollow');
        }
    };

    const handleMouseLeave = () => {
        if (statusBtn === 'unfollow') {
            setStatusBtn('following');
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            className={[classes.followBtn, statusBtn].join(' ')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => onUnfollowRequest(username)}
            disableElevation
        >
            {l(`user.profile.${statusBtn}`)}
        </Button>
    );
};

export const UserProfileHeaderButton = localized(_UserProfileHeaderButton);
