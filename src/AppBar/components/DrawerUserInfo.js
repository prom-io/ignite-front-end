import React, {Fragment} from "react";
import {inject, observer} from "mobx-react";
import {Typography, Avatar} from "@material-ui/core";

const lineBreak = (param) => (param.slice(0, 21) + " " + param.slice(21));

const _DrawerUserInfo = ({currentUser}) => {
    if (!currentUser) {
        return null;
    }

    return (
        <Fragment>
            <Avatar src={currentUser.avatar}
                    style={{
                        width: 48,
                        height: 48
                    }}
            />
            <Typography variant="body1">
                <strong>{lineBreak(currentUser.username)}</strong>
            </Typography>
            <Typography variant="body2"
                        color="textSecondary"
            >
                {lineBreak(currentUser.display_name)}
            </Typography>
            <div style={{
                display: "flex"
            }}>
                <Typography variant="body1">
                    <strong>{currentUser.followers_count}</strong>
                </Typography>
                <Typography variant="body2"
                            color="textSecondary"
                >
                    Followers
                </Typography>
                <Typography variant="body1">
                    <strong>{currentUser.follows_count}</strong>
                </Typography>
                <Typography variant="body2"
                            color="textSecondary"
                >
                    Follows
                </Typography>
            </div>
        </Fragment>
    );
};

const mapMobxToProps = ({authorization}) => ({
    currentUser: authorization.currentUser
});

export const DrawerUserInfo = inject(mapMobxToProps)(observer(_DrawerUserInfo));
