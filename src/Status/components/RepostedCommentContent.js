import React from "react";
import {Divider} from "@material-ui/core";
import {CommentListItem} from "../../Comment/components";

export const RepostedCommentContent = ({comment, displayClearButton = false, onClearButtonClick}) => {

    return (
        <div style={{display: "flex"}}>
            <Divider orientation="vertical"
                     flexItem
            />
            <CommentListItem comment={comment}
                             hideBottomMenu
                             hideBottomDivider
                             displayClearButton={displayClearButton}
                             onClearButtonClick={onClearButtonClick}
            />
        </div>
    )
};
