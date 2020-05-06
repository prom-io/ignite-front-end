import React, {Fragment} from "react";
import {Typography} from "@material-ui/core";
import {format} from "date-fns";
import {addLineBreak} from "../../utils/string-utils";
import {localized} from "../../localization/components";

const _UserProfileInfo = ({username, displayName, createdAt, l, dateFnsLocale}) => (
    <Fragment>
        <Typography variant="h6" className="user-profile-info-text">
            {addLineBreak(displayName)}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="user-profile-info-text" >
            {`@${addLineBreak(username)}`}
        </Typography>
        <Typography variant="body1" noWrap className="user-profile-info-text">
            {l("user.profile.member-since")} {format(createdAt, "MMMM yyyy", {locale: dateFnsLocale})}
        </Typography>
    </Fragment>
);

export const UserProfileInfo = localized(_UserProfileInfo);
