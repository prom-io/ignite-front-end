import React from "react";
import {inject} from "mobx-react";
import {CardHeader, Typography, Avatar} from "@material-ui/core";
import prettyDate from "pretty-date";
import {Link} from "mobx-router";
import {StatusMenu} from "./StatusMenu";
import {Routes} from "../../routes";

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
                            <Typography>
                                <strong>{lineBreak(displayName)}</strong>
                            </Typography>
                        </Link>
                        <Typography variant="body1"
                                    color="textSecondary"
                        >
                            {prettyDate.format(new Date(createdAt))}
                        </Typography>
                    </div>
                }
                subheader={`@${lineBreak(username)}`}
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
