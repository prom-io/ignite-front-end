import React, {Fragment} from "react";
import {inject, observer} from "mobx-react";
import {Typography} from "@material-ui/core";
import {format} from "date-fns";
import {OpenUpdateUserProfileDialogButton} from "./OpenUpdateUserProfileDialogButton";
import {addLineBreak} from "../../utils/string-utils";
import {localized} from "../../localization/components";

const _UserProfileInfo = ({username, displayName, user, currentUser, bio}) => (
    <Fragment>
        <div>
                <Typography variant="h6" className="user-profile-info-text">
                        {addLineBreak(displayName)}
                </Typography>
                {currentUser && currentUser.id === user.id && (
                    <div style={{float: "right"}}>
                            <OpenUpdateUserProfileDialogButton/>
                    </div>
                )}
        </div>
        <Typography variant="body2" color="textSecondary" className="user-profile-info-text" >
            {`@${addLineBreak(username)}`}
        </Typography>
        {bio && <Typography className="user-profile-info-text">{bio}</Typography>}
    </Fragment>
);

const mapMobxToProps = ({userProfile, authorization}) => ({
        user: userProfile.user,
        currentUser: authorization.currentUser
});

export const UserProfileInfo = localized(
    inject(mapMobxToProps)(observer(_UserProfileInfo))
);
