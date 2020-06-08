import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, makeStyles } from '@material-ui/core';

import { FadeLoader } from 'react-spinners';
import { SideBarList, UnfollowDialog } from '.';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10px',
        display: 'table',
    },
}));

const _WhoToFollowList = ({
    isMobile,
    fetchWhoToFollow,
    whoToFollowItems,
    actionWithFollow,
    pending,
    selectedUser,
    unfollowUser,
    setUnfollowDialogOpen,
    unfollowDialogOpen,
}) => {
    const classes = useStyles();
    const viewCount = isMobile ? 3 : 5;

    useEffect(() => {
        fetchWhoToFollow();
    }, []);

    return whoToFollowItems.slice(0, viewCount).length === 0 && pending ? (
        <div className={classes.centered}><FadeLoader color="#FF5C01" css="transform: scale(0.5); top: 10px; left: 10px" /></div>
    ) : (
        <>
            <SideBarList
                users={whoToFollowItems.slice(0, viewCount)}
                actionWithFollow={actionWithFollow}
            />
            <UnfollowDialog
                username={selectedUser.username}
                unfollowAction={unfollowUser}
                unfollowDialogOpen={unfollowDialogOpen}
                setUnfollowDialogOpen={setUnfollowDialogOpen}
            />
        </>
    );
};

const mapMobxToProps = ({ whoToFollow, followAction }) => ({
    fetchWhoToFollow: whoToFollow.fetchWhoToFollow,
    whoToFollowItems: whoToFollow.whoToFollowItems,
    pending: whoToFollow.pending,
    actionWithFollow: followAction.actionWithFollow,
    selectedUser: followAction.selectedUser,
    unfollowUser: followAction.unfollowUser,
    setUnfollowDialogOpen: followAction.setUnfollowDialogOpen,
    unfollowDialogOpen: followAction.unfollowDialogOpen,
});

export const WhoToFollowList = inject(mapMobxToProps)(observer(_WhoToFollowList));
