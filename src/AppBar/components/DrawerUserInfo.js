import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, Avatar } from '@material-ui/core';

const lineBreak = (param) => (`${param.slice(0, 21)} ${param.slice(21)}`);

const _DrawerUserInfo = ({ currentUser }) => {
    if (!currentUser) {
        return null;
    }

    return (
        <>
            <div className="sidebar-menu-user-wrapper">
                <Avatar
                    src={currentUser.avatar}
                    className="sidebar-menu-user-avatar"
                />
                <div className="sidebar-menu-user-info">
                    <Typography variant="body1" className="sidebar-menu-user-info-name">
                        <strong>{lineBreak(currentUser.display_name)}</strong>
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        className="sidebar-menu-user-info-id"
                    >
                        {lineBreak(currentUser.username)}
                    </Typography>
                </div>
                <div className="sidebar-menu-user-info-count">
                    <div className="sidebar-menu-user-info-count-item">
                        <Typography variant="body1">
                            <strong>{currentUser.followers_count}</strong>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >
                            Followers
                        </Typography>
                    </div>
                    <div className="sidebar-menu-user-info-count-item">
                        <Typography variant="body1">
                            <strong>{currentUser.follows_count}</strong>
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                        >
                            Follows
                        </Typography>
                    </div>

                </div>
            </div>
        </>
    );
};

const mapMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser,
});

export const DrawerUserInfo = inject(mapMobxToProps)(observer(_DrawerUserInfo));
