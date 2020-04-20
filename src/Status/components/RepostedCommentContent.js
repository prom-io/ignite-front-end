import React from "react";
import {makeStyles} from "@material-ui/core";
import {CommentListItem} from "../../Comment/components";

const useStyles = makeStyles(() => ({
    repostedCommentContent: {
        display: "flex",
        border: "1px solid #F1EBE8"
    }
}));

export const RepostedCommentContent = ({comment, displayClearButton = false, onClearButtonClick}) => {
    const classes = useStyles();

    return (
        <div className={classes.repostedCommentContent}>
            <CommentListItem comment={comment}
                             hideBottomMenu
                             hideBottomDivider
                             displayClearButton={displayClearButton}
                             onClearButtonClick={onClearButtonClick}
            />
        </div>
    )
};
