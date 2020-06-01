import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    followBtn: {
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '30px',
        width: '80px',
        height: '24px',
        padding: '5px 21px',
        lineHeight: 0,
        color: '#FF5C01',
        fontSize: '12px',

        [theme.breakpoints.down('md')]: {
            width: '90px',
        },

        '&.lg': {
            width: '96px',
            height: '32px',
            fontSize: '15px',
            fontWeight: 600,
            lineHeight: '18px',
        },

        '&.follow': {
            background: 'transparent',
        },

        '&.following': {
            border: 'none',
            background: 'rgba(255, 92, 1, 0.2)',
        },

        '&.followed': {
            border: 'none',
            background: 'rgba(255, 92, 1, 0.2)',
        },

        '&.unfollow': {
            background: theme.palette.primary.main,
            color: '#fff',
        },
    },
}));

const _FollowButton = ({ user, actionWithFollow, size, l }) => {
    const classes = useStyles();
    const [statusBtn, setStatusBtn] = useState(
        user.following ? 'followed' : user.followingForBtn ? 'following' : 'follow',
    );

    const handleMouseEnter = () => {
        if (statusBtn === 'following' || statusBtn === 'followed') {
            setStatusBtn('unfollow');
        }
    };

    const handleMouseLeave = () => {
        if (statusBtn === 'unfollow') {
            setStatusBtn(
                user.following
                    ? 'followed'
                    : user.followingForBtn
                        ? 'following'
                        : 'follow',
            );
        }
    };

    return (
        <Button
            variant="contained"
            color="primary"
            className={[classes.followBtn, statusBtn, size].join(' ')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => actionWithFollow(user, setStatusBtn)}
        >
            {l(`user.profile.${statusBtn}`)}
        </Button>
    );
};

export const FollowButton = localized(_FollowButton);
