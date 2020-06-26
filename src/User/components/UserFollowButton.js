import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    followBtn: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '30px',
        padding: '5px 21px',
        color: '#FF5C01',
        width: '96px',
        height: '32px',
        fontSize: '15px',
        fontWeight: 600,
        lineHeight: '18px',

        [theme.breakpoints.down('md')]: {
            width: '90px',
        },

        '&.follow': {
            background: '#fff',
        },

        '&.following': {
            border: 'none',
            background: 'rgba(255, 92, 1, 0.2)',
        },

        '&.unfollow': {
            background: theme.palette.primary.main,
            color: '#fff',
        },
    },
}));

const _UserFollowButton = ({ user, actionWithFollow, l }) => {
    const classes = useStyles();
    const [statusBtn, setStatusBtn] = useState(
        user.following || user.followingForBtn ? 'following' : 'follow',
    );

    const handleMouseEnter = () => {
        if (statusBtn === 'following') {
            setStatusBtn('unfollow');
        }
    };

    const handleMouseLeave = () => {
        if (statusBtn === 'unfollow') {
            setStatusBtn(
                user.following || user.followingForBtn ? 'following' : 'follow',
            );
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            className={[classes.followBtn, statusBtn].join(' ')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => actionWithFollow(user, setStatusBtn)}
        >
            {l(`user.profile.${statusBtn}`)}
        </Button>
    );
};

export const UserFollowButton = localized(_UserFollowButton);
