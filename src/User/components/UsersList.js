import React from "react";
import { inject } from "mobx-react";

import { UsersListItem } from "./UsersListItem";
import { UnfollowDialog } from "../../Follow/components";

const _UsersList = ({
    users,
    routerStore,
    actionWithFollow,
    selectedUser,
    unfollowUser,
    setUnfollowDialogOpen,
    unfollowDialogOpen
}) => (
    <>
        {users.map(user => (
            <UsersListItem
                user={user}
                actionWithFollow={actionWithFollow}
                routerStore={routerStore}
            />
        ))}
        <UnfollowDialog
            username={selectedUser.username}
            unfollowAction={unfollowUser}
            unfollowDialogOpen={unfollowDialogOpen}
            setUnfollowDialogOpen={setUnfollowDialogOpen}
        />
    </>
);

const mapMobxToProps = ({ store, followAction }) => ({
    routerStore: store,
    actionWithFollow: followAction.actionWithFollow,
    selectedUser: followAction.selectedUser,
    unfollowUser: followAction.unfollowUser,
    setUnfollowDialogOpen: followAction.setUnfollowDialogOpen,
    unfollowDialogOpen: followAction.unfollowDialogOpen,
});

export const UsersList = inject(mapMobxToProps)(_UsersList);
