import React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "mobx-router";
import {CardContent, makeStyles, Typography, useTheme} from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";
import {StatusMediaAttachments} from "./StatusMediaAttachments";
import {RepostedStatusContent} from "./RepostedStatusContent";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {Routes} from "../../routes";
import {localized} from "../../localization/components";

const useStyles = makeStyles(theme => ({
    statusText: {
        overflowWrap: "break-word",
        fontFamily: "Museo Sans Cyrl",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: "15px",
        lineHeight: "23px",
        color: "#1C1C1C"
    },
    replyingToLabel: {
        color: "#A2A2A2 !important"
    },
    replyToContainer: {
        marginBottom: theme.spacing(1),
        display: "flex"
    },
    replyingToLink: {
        textDecoration: "none",
        color: "#A2A2A2",
        marginLeft: 5
    },
    threadLink: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        marginTop: theme.spacing(1)
    }
}));

const _StatusBody = ({
    text,
    mediaAttachments,
    referredStatus,
    statusReferenceType,
    nestedReferredStatusId,
    nestedReferredStatusReferenceType,
    routerStore,
    hideThreadLink,
    l
}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <CardContent className="status-list-body-container" style={{flex: "auto"}}>
            {referredStatus && statusReferenceType === "COMMENT" && (
                <ClickEventPropagationStopper>
                    <div style={{
                        display: "flex",
                        // marginBottom: 4
                    }}>
                        <Typography className={classes.replyingToLabel}>
                            {l("status.replying-to")}
                        </Typography>
                        <Link store={routerStore}
                              view={Routes.userProfile}
                              params={{username: referredStatus.account.username}}
                              className={classes.replyingToLink}
                        >
                            <Typography style={{color: "#A2A2A2"}}>
                                @{referredStatus.account.username}
                            </Typography>
                        </Link>
                    </div>
                </ClickEventPropagationStopper>
            )}
            <Typography variant="body1"
                        className={classes.statusText}
            >
                {text}
            </Typography>
            <StatusMediaAttachments mediaAttachments={mediaAttachments}/>
            {referredStatus && statusReferenceType === "REPOST" && <RepostedStatusContent repostedStatus={referredStatus}/>}
            {nestedReferredStatusId && nestedReferredStatusReferenceType === "REPOST" && (
                <ClickEventPropagationStopper>
                    <Link store={routerStore}
                          view={Routes.status}
                          params={{id: nestedReferredStatusId}}
                          style={{
                              color: theme.palette.primary.main
                          }}
                    >
                       <div style={{display: "flex"}}>
                           <ReplyIcon/>
                           <Typography style={{color: theme.palette.primary.main}}>
                               {l("status.reposted-status")}
                           </Typography>
                       </div>
                    </Link>
                </ClickEventPropagationStopper>
            )}
            {referredStatus && statusReferenceType === "COMMENT" && !hideThreadLink && (
                <ClickEventPropagationStopper>
                    <Link store={routerStore}
                          view={Routes.status}
                          params={{id: referredStatus.id}}
                          className={classes.threadLink}
                    >
                        <Typography style={{
                            color: theme.palette.primary.main,
                            marginTop: theme.spacing(1)
                        }}>
                            {l("status.show-this-thread")}
                        </Typography>
                    </Link>
                </ClickEventPropagationStopper>
            )}
            {nestedReferredStatusId && nestedReferredStatusReferenceType === "COMMENT" && !hideThreadLink && (
                <ClickEventPropagationStopper>
                    <Link store={routerStore}
                          view={Routes.status}
                          params={{id: nestedReferredStatusId}}
                          className={classes.threadLink}
                    >
                        <Typography style={{
                            color: theme.palette.primary.main,
                            marginTop: theme.spacing(1)
                        }}>
                            {l("status.show-this-thread")}
                        </Typography>
                    </Link>
                </ClickEventPropagationStopper>
            )}
        </CardContent>
    );
};

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const StatusBody = localized(
    inject(mapMobxToProps)(observer(_StatusBody))
);
