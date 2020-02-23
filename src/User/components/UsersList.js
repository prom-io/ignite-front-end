import React from "react";
import {Avatar, CardHeader, List, ListItem, ListItemAvatar} from "@material-ui/core";

export const UsersList = ({users}) => (
    <List>
        {users.map(user => (
            <ListItem role="div">
                <ListItemAvatar>
                    <Avatar src={user.avatar || "http://localhost:3000/avatars/original/missing.png"}/>
                </ListItemAvatar>
                <CardHeader title={user.display_name}
                            subheader={`${user.username}`}
                />
            </ListItem>
        ))}
    </List>
);
