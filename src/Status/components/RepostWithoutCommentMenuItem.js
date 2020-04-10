import React from "react";
import {inject, observer} from "mobx-react";
import {ListItemIcon, ListItemText, makeStyles, MenuItem} from "@material-ui/core";
import {RepostIcon} from "../../icons/RepostIcon";
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

const _RepostWithoutCommentMenuItem = ({
    onClick,
    status,
    setRepostedStatus,
    createStatus,
    l
}) => {
    const classes = useStyles();

    const handleClick = () => {
        setRepostedStatus(status);
        createStatus();

        if (onClick) {
            onClick();
        }
    };

    return (
        <MenuItem onClick={handleClick}
                  classes={{
                      gutters: classes.menuItemGutters
                  }}
        >
            <ListItemIcon classes={{
                root: classes.listItemIconRoot
            }}>
                <RepostIcon/>
            </ListItemIcon>
            <ListItemText>
                {l("status.repost")}
            </ListItemText>
        </MenuItem>
    )
};

const mapMobxToProps = ({createStatus}) => ({
    createStatus: createStatus.createStatus,
    setRepostedStatus: createStatus.setRepostedStatus
});

export const RepostWithoutCommentMenuItem = localized(
    inject(mapMobxToProps)(observer(_RepostWithoutCommentMenuItem))
);
