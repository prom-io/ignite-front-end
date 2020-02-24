import React, {Fragment} from "react";
import {Typography} from "@material-ui/core";
import {format} from "date-fns";


const lineBreak = (param) => (param.slice(0, 21) + " " + param.slice(21))

export const UserProfileInfo = ({username, displayName, createdAt}) => (
    <Fragment>
        <Typography variant="h6" className="user-profile-info-text">
            {lineBreak(displayName)}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="user-profile-info-text" >
            {`@${lineBreak(username)}`}
        </Typography>
        <Typography variant="body1" noWrap className="user-profile-info-text">
            Member since {format(createdAt, "MMMM yy")}
        </Typography>
    </Fragment>
);
