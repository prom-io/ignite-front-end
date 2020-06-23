import React from "react";
import { inject } from 'mobx-react';

import { UsersListItem } from "./UsersListItem";

const _UsersList = ({ users, routerStore }) => (
    users.map(user => (
        <UsersListItem user={user} routerStore={routerStore} />
    ))
);

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const UsersList = inject(mapMobxToProps)(_UsersList);
