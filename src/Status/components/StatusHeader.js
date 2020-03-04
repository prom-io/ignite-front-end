import React from "react";
import {inject} from "mobx-react";
import {CardHeader, Typography, Avatar, Hidden} from "@material-ui/core";
import prettyDate from "pretty-date";
import {Link} from "mobx-router";
import {StatusMenu} from "./StatusMenu";
import {Routes} from "../../routes";
import {SmallEllipseIcon} from "../../icons/SmallEllipseIcon";
import {addLineBreak, trimString} from "../../utils/string-utils";

const _StatusHeader = ({
    username,
    userId,
    displayName,
    avatar,
    createdAt,
    displayMenu,
    currentUserFollowsAuthor,
    currentUserIsAuthor,
    statusId,
    onFollowRequest,
    onUnfollowRequest,
    routerStore
}) => (
    <CardHeader avatar={<Avatar src={avatar} className="avatar-mini"/>}
                title={
                    <div className="status-header">
                        <Link store={routerStore}
                              view={Routes.userProfile}
                              params={{username: userId}}
                              style={{
                                  textDecoration: "underline",
                                  color: "inherit"
                              }}
                        >
                            <Hidden xsDown>
                                <Typography>
                                    <strong>{displayName}</strong>
                                </Typography>
                            </Hidden>
                            <Hidden smUp>
                                <Typography>
                                    <strong>{addLineBreak(displayName)}</strong>
                                </Typography>
                            </Hidden>
                        </Link>
                        <Typography variant="body1"
                                    color="textSecondary"
                                    className="status-header-date"
                        >
                            {prettyDate.format(new Date(createdAt))}
                        </Typography>
                    </div>
                }
                subheader={(
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Hidden xsDown>
                            <Typography>
                                @{username}
                            </Typography>
                        </Hidden>
                        <Hidden smUp>
                            <Typography style={{fontSize: 15}}>
                                @{trimString(username, 20)}
                            </Typography>
                        </Hidden>
                        <Typography style={{marginLeft: 12, fontSize: 12}}>
                            <SmallEllipseIcon/> {prettyDate.format(new Date(createdAt))}
                        </Typography>
                    </div>
                )}
                action={displayMenu && <StatusMenu onUnfollowRequest={onUnfollowRequest}
                                                   onFollowRequest={onFollowRequest}
                                                   statusId={statusId}
                                                   currentUserFollowsAuthor={currentUserFollowsAuthor}
                                                   currentUserIsAuthor={currentUserIsAuthor}
                />}
    />
);

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const StatusHeader = inject(mapMobxToProps)(_StatusHeader);
