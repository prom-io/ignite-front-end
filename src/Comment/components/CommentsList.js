import React from "react";
import {inject, observer} from "mobx-react";
import {Button, CircularProgress, makeStyles} from "@material-ui/core";
import {CommentListItem} from "./CommentListItem";
import {CreateCommentForm} from "./CreateCommentForm";

const useStyles = makeStyles(theme => ({
    centered: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    commentListWrapper: {
        display: "flex",
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderTop: "1px solid #F1EBE8"
    },
    commentList: {
        borderLeft: "1px solid #F1EBE8",
        borderRight: "1px solid #F1EBE8",
    }
}));

const _CommentList = ({statusId, commentsToStatusesMap, fetchComments}) => {
    const classes = useStyles();

    if (commentsToStatusesMap[statusId] && commentsToStatusesMap[statusId].expanded) {
        const commentCreation = commentsToStatusesMap[statusId].commentCreation;

        return (
            <div className={classes.commentListWrapper}>
                <div style={{
                    width:"100%"
                }}>
                    <div className={classes.commentList}>
                        {commentsToStatusesMap[statusId].comments.map(comment => (
                            <CommentListItem comment={comment}/>
                        ))}
                        {commentsToStatusesMap[statusId].pending && (
                            <CircularProgress size={25} color="primary" className={classes.centered}/>
                        )}
                    </div>
                    <Button variant="text"
                            color="primary"
                            disabled={commentsToStatusesMap[statusId].pending}
                            onClick={() => fetchComments(statusId)}
                            style={{width: "100%"}}
                    >
                        {commentsToStatusesMap[statusId].pending && <CircularProgress size={15} color="primary"/>}
                        Show more
                    </Button>
                    <CreateCommentForm text={commentCreation.text}
                                       setText={commentCreation.setText}
                                       createComment={commentCreation.createComment}
                                       pending={commentCreation.pending}
                    />
                </div>
            </div>
        )
    }
};

const mapMobxToProps = ({comments}) => ({
    commentsToStatusesMap: comments.commentsByStatusesMap,
    fetchComments: comments.fetchComments
});

export const CommentsList = inject(mapMobxToProps)(observer(_CommentList));
