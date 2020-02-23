import React, {Fragment} from "react";
import {Typography} from "@material-ui/core";
import {format} from "date-fns";

export const UserProfileInfo = ({username, displayName, createdAt}) => (
    <Fragment>
        <Typography variant="h6" noWrap>
            {displayName}
        </Typography>
        <Typography variant="body2" color="textSecondary" noWrap>
            {`@${username}`}
        </Typography>
        <Typography variant="body1" noWrap>
            Member since {format(createdAt, "MMMM yy")}
        </Typography>
    </Fragment>
);
