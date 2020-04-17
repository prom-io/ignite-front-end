import React from "react";
import {inject, observer} from "mobx-react";
import {IconButton, Typography} from "@material-ui/core";
import {CommentIcon} from "../../icons/CommentIcon";

const _CommentsButton = ({statusId, commentsCount, commentsByStatusesMap, fetchComments, setCommentsExpanded}) => {
    const handleClick = () => {
        if (!commentsByStatusesMap[statusId]) {
            fetchComments(statusId);
        } else {
            console.log(commentsByStatusesMap[statusId].expanded);
            setCommentsExpanded(statusId, !commentsByStatusesMap[statusId].expanded);
        }
    };

    return (
        <div className="status-list-bottom-box">
            <IconButton onClick={handleClick}>
                <CommentIcon/>
            </IconButton>
            <Typography>
                {commentsCount}
            </Typography>
        </div>
    )
};

const mapMobxToProps = ({comments}) => ({
    commentsByStatusesMap: comments.commentsByStatusesMap,
    fetchComments: comments.fetchComments,
    setCommentsExpanded: comments.setCommentsExpanded
});

export const CommentsButton = inject(mapMobxToProps)(observer(_CommentsButton));
