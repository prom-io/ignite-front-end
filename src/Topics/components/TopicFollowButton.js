import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, makeStyles } from '@material-ui/core';

import { localized } from '../../localization/components';

const useStyles = makeStyles(theme => ({
    followTopicButton: {
        fontWeight: 600,
        fontSize: '15px',
        lineHeight: '0px',
        height: '34px',
        width: '114px',
        borderRadius: '30px',
        [theme.breakpoints.down('sm')]: {
            height: '28px',
            width: '90px',
            marginRight: '15px',
        },

        '&.follow': {},

        '&.following': {
            border: 'none',
            background: 'rgba(255, 92, 1, 0.2)',
            color: '#FF5C01',
        },

        '&.unfollow': {
            background: theme.palette.primary.main,
            color: '#fff',
        },
    },
}));

export const _TopicFollowButton = ({
    currentTopic,
    followTopic,
    unfollowTopic,
    l,
}) => {
    const classes = useStyles();
    const [statusBtn, setStatusBtn] = useState(
        currentTopic.following ? 'following' : 'follow',
    );

    useEffect(() => {
        const status = currentTopic.following ? 'following' : 'follow';
        if (status !== statusBtn) {
            setStatusBtn(status);
        }
    }, [currentTopic.following]);

    const handleMouseEnter = () => {
        if (statusBtn === 'following') {
            setStatusBtn('unfollow');
        }
    };

    const handleMouseLeave = () => {
        if (statusBtn === 'unfollow') {
            setStatusBtn(currentTopic.following ? 'following' : 'follow');
        }
    };

    return (
        <Button
            className={[classes.followTopicButton, statusBtn].join(' ')}
            variant="contained"
            color="primary"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={currentTopic.following ? unfollowTopic : followTopic}
        >
            {l(`user.profile.${statusBtn}`)}
        </Button>
    );
};

const mapMobxToProps = ({ topicStatuses }) => ({
    currentTopic: topicStatuses.currentTopic,
    followTopic: topicStatuses.followTopic,
    unfollowTopic: topicStatuses.unfollowTopic,
});

export const TopicFollowButton = localized(
    inject(mapMobxToProps)(observer(_TopicFollowButton)),
);
