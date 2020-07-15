import React from 'react';
import { inject } from 'mobx-react';
import { makeStyles } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UsersListItem } from './UsersListItem';
import { UnfollowDialog } from '../../Follow/components';
import Loader from '../../components/Loader';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '150px',
        display: 'table',
    },
}));

const _UsersList = ({
    users,
    onNextPageRequest,
    hasMore,
    routerStore,
    actionWithFollow,
    selectedUser,
    unfollowUser,
    setUnfollowDialogOpen,
    unfollowDialogOpen,
    currentUser,
}) => {
    const classes = useStyles();

    return (
        <>
            <InfiniteScroll
                next={onNextPageRequest}
                hasMore={hasMore}
                loader={<div className={classes.centered}><Loader size="lg" /></div>}
                dataLength={users.length}
                style={{ overflowY: 'hidden' }}
            >
                {users.map(user => (
                    <UsersListItem
                        user={user}
                        actionWithFollow={actionWithFollow}
                        routerStore={routerStore}
                        currentUser={currentUser}
                    />
                ))}
            </InfiniteScroll>
            <UnfollowDialog
                username={selectedUser.username}
                unfollowAction={unfollowUser}
                unfollowDialogOpen={unfollowDialogOpen}
                setUnfollowDialogOpen={setUnfollowDialogOpen}
            />
        </>
    );
};

const mapMobxToProps = ({ store, followAction, authorization }) => ({
    routerStore: store,
    actionWithFollow: followAction.actionWithFollow,
    selectedUser: followAction.selectedUser,
    unfollowUser: followAction.unfollowUser,
    setUnfollowDialogOpen: followAction.setUnfollowDialogOpen,
    unfollowDialogOpen: followAction.unfollowDialogOpen,
    currentUser: authorization.currentUser,
});

export const UsersList = inject(mapMobxToProps)(_UsersList);
