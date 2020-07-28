import React from 'react';
import { inject, observer } from 'mobx-react';
import { ListItemIcon, ListItemText, makeStyles, MenuItem } from '@material-ui/core';
import { RepostIcon } from '../../icons/RepostIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    listItemIconRoot: {
        minWidth: 15,
        marginRight: 8,
    },
}));

const _RepostWithoutCommentMenuItem = ({
    onClick,
    status,
    setReferredStatus,
    setStatusReferenceType,
    createStatus,
    l,
}) => {
    const classes = useStyles();

    const handleClick = () => {
        setReferredStatus(status);
        setStatusReferenceType('REPOST');
        createStatus();

        if (onClick) {
            onClick();
        }
    };

    return (
        <MenuItem onClick={handleClick}>
            <ListItemIcon classes={{
                root: classes.listItemIconRoot,
            }}
            >
                <RepostIcon />
            </ListItemIcon>
            <ListItemText>
                {l('status.repost')}
            </ListItemText>
        </MenuItem>
    );
};

const mapMobxToProps = ({ createStatus }) => ({
    createStatus: createStatus.createStatus,
    setReferredStatus: createStatus.setReferredStatus,
    setStatusReferenceType: createStatus.setStatusReferenceType,
});

export const RepostWithoutCommentMenuItem = localized(
    inject(mapMobxToProps)(observer(_RepostWithoutCommentMenuItem)),
);
