import React from "react";
import {inject} from "mobx-react";
import {Avatar, CardHeader, List, ListItem, ListItemAvatar, Typography} from "@material-ui/core";
import {Link} from "mobx-router";
import {Routes} from "../../routes";

const _UsersList = ({users, routerStore}) => (
    <List>
        {users.map(user => (
            <ListItem role="div">
                <ListItemAvatar>
                    <Avatar src={user.avatar || "http://localhost:3000/avatars/original/missing.png"}/>
                </ListItemAvatar>
                <CardHeader title={(
                    <Link view={Routes.userProfile}
                          params={{username: user.username}}
                          store={routerStore}
                          style={{
                              color: "inherit"
                          }}
                    >
                        <Typography>
                            <strong>{user.display_name}</strong>
                        </Typography>
                    </Link>
                )}
                            subheader={`${user.username}`}
                />
            </ListItem>
        ))}
    </List>
);

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const UsersList = inject(mapMobxToProps)(_UsersList);
