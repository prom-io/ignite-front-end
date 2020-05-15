import React from 'react';
import { inject, observer } from 'mobx-react';
import { MenuItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { PenIcon } from '../../icons/PenIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    menuItemGutters: {
        paddingLeft: 0,
    },
    listItemIconRoot: {
        minWidth: 15,
        marginRight: 8,
    },
}));

const _RepostWithCommentMenuItem = ({ status, onClick, setReferredStatus, setStatusReferenceType, setCreateStatusDialogOpen, l }) => {
    const classes = useStyles();

    const handleClick = event => {
        setReferredStatus(status);
        setStatusReferenceType('REPOST');
        setCreateStatusDialogOpen(true);

        if (onClick) {
            onClick(event);
        }
    };

    return (
        <MenuItem
            classes={{
                gutters: classes.menuItemGutters,
            }}
            onClick={handleClick}
        >
            <ListItemIcon classes={{
                root: classes.listItemIconRoot,
            }}
            >
                <PenIcon />
            </ListItemIcon>
            <ListItemText>
                {l('status.repost.with-comment')}
            </ListItemText>
        </MenuItem>
    );
};

const mapMobxToProps = ({ createStatus }) => ({
    setReferredStatus: createStatus.setReferredStatus,
    setStatusReferenceType: createStatus.setStatusReferenceType,
    setCreateStatusDialogOpen: createStatus.setCreateStatusDialogOpen,
});

export const RepostWithCommentMenuItem = localized(
    inject(mapMobxToProps)(observer(_RepostWithCommentMenuItem)),
);
