import React from "react";
import {inject, observer} from "mobx-react";
import {MenuItem, ListItemIcon, ListItemText, makeStyles} from "@material-ui/core";
import {PenIcon} from "../../icons/PenIcon";
import {localized} from "../../localization/components";

const useStyles = makeStyles(() => ({
    menuItemGutters: {
        paddingLeft: 0
    },
    listItemIconRoot: {
        minWidth: 15,
        marginRight: 8
    }
}));

const _RepostCommentWithCommentMenuItem = ({comment, onClick, setRepostedComment, setCreateStatusDialogOpen, l}) => {
    const classes = useStyles();

    const handleClick = event => {
        setRepostedComment(comment);
        setCreateStatusDialogOpen(true);

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <MenuItem classes={{
            gutters: classes.menuItemGutters
        }}
                  onClick={handleClick}
        >
            <ListItemIcon classes={{
                root: classes.listItemIconRoot
            }}>
                <PenIcon/>
            </ListItemIcon>
            <ListItemText>
                {l("status.repost.with-comment")}
            </ListItemText>
        </MenuItem>
    )
};

const mapMobxToProps = ({createStatus}) => ({
    setRepostedComment: createStatus.setRepostedComment,
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen
});

export const RepostCommentWithCommentMenuItem = localized(
    inject(mapMobxToProps)(observer(_RepostCommentWithCommentMenuItem))
);
