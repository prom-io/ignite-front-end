import React from "react";
import {inject, observer} from "mobx-react";
import {IconButton, Typography} from "@material-ui/core";
import {CommentIcon} from "../../icons/CommentIcon";

const _CommentsButton = ({status, setCreateStatusDialogOpen, setReferredStatus, setStatusReferenceType, currentUser}) => {
    const handleClick = () => {
        if (!currentUser) {
            return;
        }

        setReferredStatus(status);
        setStatusReferenceType("COMMENT");
        setCreateStatusDialogOpen(true);
    };

    return (
        <div className="status-list-bottom-box">
            <IconButton onClick={handleClick}>
                <CommentIcon/>
            </IconButton>
            <Typography>
                {status.comments_count}
            </Typography>
        </div>
    )
};

const mapMobxToProps = ({createStatus, authorization}) => ({
    currentUser: authorization.currentUser,
    setReferredStatus: createStatus.setReferredStatus,
    setStatusReferenceType: createStatus.setStatusReferenceType,
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen
});

export const CommentsButton = inject(mapMobxToProps)(observer(_CommentsButton));
