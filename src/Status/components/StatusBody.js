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
import {RepostedCommentContent} from "./RepostedCommentContent";

const useStyles = makeStyles(() => ({
    statusText: {
        overflowWrap: "break-word",
        fontFamily: "Museo Sans Cyrl",
        fontStyle: "normal",
        fontWeight: "300",
        fontSize: "15px",
        lineHeight: "23px",
        color: "#1C1C1C"
    }
}));

const _StatusBody = ({text, mediaAttachments, repostedStatus, repostedComment, nestedRepostedStatusId, routerStore, l}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <CardContent className="status-list-body-container" style={{flex: "auto"}}>
            <Typography variant="body1"
                        className={classes.statusText}
            >
                {text}
            </Typography>
            <StatusMediaAttachments mediaAttachments={mediaAttachments}/>
            {repostedStatus && <RepostedStatusContent repostedStatus={repostedStatus}/>}
            {repostedComment && <RepostedCommentContent comment={repostedComment}/>}
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
        </CardContent>
    );
};

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const StatusBody = localized(
    inject(mapMobxToProps)(observer(_StatusBody))
);
