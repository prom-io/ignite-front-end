import React from "react";
import {inject} from "mobx-react";
import {CardHeader, Typography, Avatar, Hidden} from "@material-ui/core";
import prettyDate from "pretty-date";
import {Link} from "mobx-router";
import {StatusMenu} from "./StatusMenu";
import {Routes} from "../../routes";
import {SmallEllipseIcon} from "../../icons/SmallEllipseIcon";

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
                                    <strong>{lineBreak(displayName)}</strong>
                                </Typography>
                            </Hidden>
                        </Link>
                    </div>
                }
                subheader={(
                    <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <Typography>
                            @{username}
                        </Typography>
                        <Typography style={{marginLeft: 12}}>
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

const lineBreak = (param) => (param.slice(0, 21) + " " + param.slice(21))

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const StatusHeader = inject(mapMobxToProps)(_StatusHeader);
