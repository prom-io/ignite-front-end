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
        color: "#A2A2A2"
    },
    replyingToLink: {
        textDecoration: "none",
        color: "#A2A2A2"
    },
    threadLink: {
        textDecoration: "none",
        color: theme.palette.primary.main
    }
}));

const _StatusBody = ({text, mediaAttachments, referredStatus, nestedRepostedStatusId, routerStore, l}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <CardContent className="status-list-body-container" style={{flex: "auto"}}>
            {referredStatus && referredStatus.status_reference_type === "COMMENT" && (
                <div>
                    <Typography classname={classes.replyingToLabel}>
                        {l("status.replying-to")}
                    </Typography>
                    <Link store={routerStore}
                          view={Routes.userProfile}
                          params={{username: referredStatus.account.username}}
                          className={classes.replyingToLink}
                    >
                        @{referredStatus.account.username}
                    </Link>
                </div>
            )}
            <Typography variant="body1"
                        className={classes.statusText}
            >
                {text}
            </Typography>
            <StatusMediaAttachments mediaAttachments={mediaAttachments}/>
            {referredStatus && referredStatus.status_reference_type === "REPOST" && <RepostedStatusContent repostedStatus={referredStatus}/>}
            {nestedRepostedStatusId && (
                <ClickEventPropagationStopper>
                    <Link store={routerStore}
                          view={Routes.status}
                          params={{id: nestedRepostedStatusId}}
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
            {referredStatus && referredStatus.status_reference_type === "COMMENT" && (
                <Link store={routerStore}
                      view={Routes.status}
                      params={{id: referredStatus.id}}
                      className={classes.threadLink}
                >
                    {l("status.show-this-thread")}
                </Link>
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
