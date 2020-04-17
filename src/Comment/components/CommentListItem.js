import React from "react";
import {inject, observer} from "mobx-react";
import {
    Avatar,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Hidden,
    IconButton,
    makeStyles,
    Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {Link} from "mobx-router";
import prettyDate from "pretty-date";
import {RepostCommentMenu} from "./RepostCommentMenu";
import {Routes} from "../../routes";
import {addLineBreak, trimString} from "../../utils/string-utils";
import {SmallEllipseIcon} from "../../icons/SmallEllipseIcon";

const useStyles = makeStyles(() => ({
    commentHeader: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        width: "100%"
    },
    commentListItem: {
        width: "100%",
    }
}));

const _CommentListItem = ({hideBottomMenu, hideBottomDivider, comment, pendingCommentsRepostsMap, routerStore, displayClearButton, onClearButtonClick}) => {
    const classes = useStyles();

    return (
        <div className={classes.commentListItem}>
            <CardHeader className={classes.commentHeader}
                        avatar={<Avatar src={comment.author.avatar} className="avatar-mini"/>}
                        title={
                            <div className={classes.commentHeader}>
                                <Link store={routerStore}
                                      view={Routes.userProfile}
                                      params={{username: comment.author.username}}
                                      style={{
                                          textDecoration: "underline",
                                          color: "inherit"
                                      }}
                                >
                                    <Hidden xsDown>
                                        <Typography>
                                            <strong>{trimString(comment.author.display_name, 35)}</strong>
                                        </Typography>
                                    </Hidden>
                                    <Hidden smUp>
                                        <Typography>
                                            <strong>{addLineBreak(comment.author.display_name)}</strong>
                                        </Typography>
                                    </Hidden>
                                </Link>
                                {displayClearButton && (
                                    <IconButton style={{float: "right"}}
                                                onClick={onClearButtonClick}
                                    >
                                        <CloseIcon/>
                                    </IconButton>
                                )}
                            </div>
                        }
                        subheader={
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <Hidden xsDown>
                                    <Typography>
                                        @{trimString(comment.author.username, 35)}
                                    </Typography>
                                </Hidden>
                                <Hidden smUp>
                                    <Typography style={{fontSize: 15}}>
                                        @{trimString(comment.author.username, 20)}
                                    </Typography>
                                </Hidden>
                                <Typography style={{marginLeft: 12, fontSize: 12}}>
                                    <SmallEllipseIcon/> {prettyDate.format(new Date(comment.created_at))}
                                </Typography>
                            </div>
                        }
            />
            <CardContent>
                <Typography>
                    {comment.text}
                </Typography>
            </CardContent>
            {!hideBottomMenu && (
                <CardActions className="status-list-bottom-container">
                    <RepostCommentMenu comment={comment}
                                       repostPending={pendingCommentsRepostsMap[comment.id]}
                    />
                </CardActions>
            )}
            {!hideBottomDivider && <Divider/>}
        </div>
    )
};

const mapMobxToProps = ({store, createStatus}) => ({
    routerStore: store,
    pendingCommentsRepostsMap: createStatus.pendingCommentsRepostsMap
});

export const CommentListItem = inject(mapMobxToProps)(observer(_CommentListItem));
