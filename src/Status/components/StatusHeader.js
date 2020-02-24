import React from "react";
import {inject} from "mobx-react";
import {CardHeader, Typography, Avatar} from "@material-ui/core";
import prettyDate from "pretty-date";
import {Link} from "mobx-router";
import {Routes} from "../../routes";

const _StatusHeader = ({username, displayName, avatar, createdAt, routerStore}) => (
    <CardHeader avatar={
                    <Avatar src={avatar} className="avatar-mini"/>
                }
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
    />
);

const lineBreak = (param) => (param.slice(0, 21) + " " + param.slice(21))

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const StatusHeader = inject(mapMobxToProps)(_StatusHeader);
