import React from "react";
import {inject, observer} from "mobx-react";
import {Typography} from "@material-ui/core";
import {RepostIcon} from "../../icons/RepostIcon";
import {localized} from "../../localization/components";

const _RepostWithoutCommentMenuItem = ({
    onClick,
    status,
    setRepostedStatus,
    createStatus,
    l
}) => {
    const handleClick = () => {
        setRepostedStatus(status);
        createStatus();

        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="status-modal-box-item"
             onClick={handleClick}
        >
            <RepostIcon />
            <Typography variant="body1" color={"textSecondary"}>
                {l("status.repost")}
            </Typography>
        </div>
    )
};

const mapMobxToProps = ({createStatus}) => ({
    createStatus: createStatus.createStatus,
    setRepostedStatus: createStatus.setRepostedStatus
});

export const RepostWithoutCommentMenuItem = localized(
    inject(mapMobxToProps)(observer(_RepostWithoutCommentMenuItem))
);
