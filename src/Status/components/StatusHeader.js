import React from "react";
import {inject} from "mobx-react";
import {CardHeader, Typography, Avatar} from "@material-ui/core";
import prettyDate from "pretty-date";
import {Link} from "mobx-router";
import {StatusMenu} from "./StatusMenu";
import {Routes} from "../../routes";

const _StatusHeader = ({
    username,
    displayName,
    avatar,
    createdAt,
    displayMenu,
    currentUserFollowAuthor,
    currentUserIsAuthor,
    statusId,
    onFollowRequest,
    onUnfollowRequest,
    routerStore
}) => (
    <CardHeader avatar={<Avatar src={avatar}/>}
                title={
                    <div style={{display: "flex"}} className="status-header">
                        <Link store={routerStore}
                              view={Routes.userProfile}
                              params={{username}}
                              style={{
                                  textDecoration: "underline",
                                  color: "inherit"
                              }}
                        >
                            <Typography>
                                <strong>{displayName}</strong>
                            </Typography>
                        </Link>
                        <Typography variant="body1"
                                    color="textSecondary"
                        >
                            {prettyDate.format(new Date(createdAt))}
                        </Typography>
                    </div>
                }
                subheader={`@${username}`}
                action={displayMenu && <StatusMenu onUnfollowRequest={onFollowRequest}
                                                   onFollowRequest={onUnfollowRequest}
                                                   statusId={statusId}
                                                   currentUserFollowsAuthor={currentUserFollowAuthor}
                                                   currentUserIsAuthor={currentUserIsAuthor}
                />}
    />
);

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const StatusHeader = inject(mapMobxToProps)(_StatusHeader);
