import React from 'react';
import { inject, observer } from 'mobx-react';
import { CircularProgress, makeStyles, useTheme } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

import { FollowPeopleItem, UnfollowDialog } from '.';
import { FadeLoader } from 'react-spinners';

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
    followListWrapper: {},
}));

const _FollowPeopleList = ({
    fetchFollowPeople,
    followPeopleItems,
    actionWithFollow,
    selectedUser,
    unfollowUser,
    setUnfollowDialogOpen,
    unfollowDialogOpen,
}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.followListWrapper}>
            <InfiniteScroll
                next={fetchFollowPeople}
                hasMore
                loader={(
                  <div className={classes.centered}><FadeLoader css="transform: scale(0.5)" color={theme.palette.primary.main} /></div>
                )}
                dataLength={followPeopleItems.length}
                style={{ overflowY: 'hidden' }}
            >
                {followPeopleItems.map(user => (
                    <FollowPeopleItem
                        user={user}
                        actionWithFollow={actionWithFollow}
                    />
                ))}
            </InfiniteScroll>
            <UnfollowDialog
                username={selectedUser.username}
                unfollowAction={unfollowUser}
                unfollowDialogOpen={unfollowDialogOpen}
                setUnfollowDialogOpen={setUnfollowDialogOpen}
            />
        </div>
    );
};

const mapMobxToProps = ({ followPeople, followAction }) => ({
    fetchFollowPeople: followPeople.fetchFollowPeople,
    followPeopleItems: followPeople.followPeopleItems,
    actionWithFollow: followAction.actionWithFollow,
    selectedUser: followAction.selectedUser,
    unfollowUser: followAction.unfollowUser,
    setUnfollowDialogOpen: followAction.setUnfollowDialogOpen,
    unfollowDialogOpen: followAction.unfollowDialogOpen,
});

export const FollowPeopleList = inject(mapMobxToProps)(observer(_FollowPeopleList));
