import React from 'react';
import { MenuItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { Undo } from '@material-ui/icons';

import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    listItemIconRoot: {
        minWidth: 15,
        marginRight: 8,
    },
}));

const _UndoRepostMenuItem = ({ onClick, l }) => {
    const classes = useStyles();

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <MenuItem onClick={handleClick} disabled>
            <ListItemIcon classes={{
                root: classes.listItemIconRoot,
            }}
            >
                <Undo />
            </ListItemIcon>
            <ListItemText>
                {l('status.undo-repost')}
            </ListItemText>
        </MenuItem>
    );
};

export const UndoRepostMenuItem = localized(_UndoRepostMenuItem);
