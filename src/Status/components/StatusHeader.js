import React from "react";
import {inject} from "mobx-react";
import {CardHeader, Typography, Avatar, Hidden, IconButton, makeStyles} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import prettyDate from "pretty-date";
import {Link} from "mobx-router";
import {StatusMenu} from "./StatusMenu";
import {Routes} from "../../routes";
import {SmallEllipseIcon} from "../../icons/SmallEllipseIcon";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {addLineBreak, trimString} from "../../utils/string-utils";

const useStyles = makeStyles(() => ({
    statusHeader: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%"
    }
}));

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
    displayClearButton = false,
    onClearButtonClick,
    routerStore
}) => {
    const classes = useStyles();

    return (
        <CardHeader avatar={<Avatar src={avatar} className="avatar-mini"/>}
                    title={
                        <div className="status-header">
                            <ClickEventPropagationStopper className={classes.statusHeader}>
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
                                            <strong>{trimString(displayName, 35)}</strong>
                                        </Typography>
                                    </Hidden>
                                    <Hidden smUp>
                                        <Typography>
                                            <strong>{addLineBreak(displayName)}</strong>
                                        </Typography>
                                    </Hidden>
                                </Link>
                                {displayClearButton && (
                                    <IconButton onClick={onClearButtonClick}
                                                style={{float: "right"}}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                )}
                            </ClickEventPropagationStopper>
                        </div>
                    }
                    subheader={(
                        <div style={{
                            display: "flex",
                            alignItems: "center"
                        }}>
                            <Hidden xsDown>
                                <Typography>
                                    @{trimString(username, 35)}
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
                    action={displayMenu && (
                        <ClickEventPropagationStopper>
                            <StatusMenu onUnfollowRequest={onUnfollowRequest}
                                        onFollowRequest={onFollowRequest}
                                        statusId={statusId}
                                        currentUserFollowsAuthor={currentUserFollowsAuthor}
                                        currentUserIsAuthor={currentUserIsAuthor}
                            />
                        </ClickEventPropagationStopper>
                    )}
        />
    );
}

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const StatusHeader = inject(mapMobxToProps)(_StatusHeader);
