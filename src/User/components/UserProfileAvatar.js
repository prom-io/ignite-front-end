import React from "react";
import {Avatar} from "@material-ui/core";

export const UserProfileAvatar = ({avatarUrl}) => (
    <Avatar src={avatarUrl}
            style={{
                width: 94,
                height: 94
            }}
    />
)
