import React from "react";
import {CommentListItem} from "../../Comment/components";

export const RepostedCommentContent = ({comment}) => {

    return (
        <CommentListItem comment={comment}
                         hideBottomMenu
        />
    )
};
