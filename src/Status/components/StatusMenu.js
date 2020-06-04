import React, { Fragment, useEffect, useRef, useState } from 'react';
import {
    ClickAwayListener,
    Grow,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    makeStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { UnfollowIcon } from '../../icons/UnfollowIcon';
import { MuteIcon } from '../../icons/MuteIcon';
import { BlockIcon } from '../../icons/BlockIcon';
import { ReportIcon } from '../../icons/ReportIcon';
import { SadIcon } from '../../icons/SadIcon';
import { EmbedIcon } from '../../icons/EmbedIcon';
import { localized } from '../../localization/components';

const useStyles = makeStyles({
    paper: {
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
    },
});

const _StatusMenu = ({ 
    currentUserFollowsAuthor, 
    currentUserIsAuthor, 
    username, 
    statusId, 
    onFollowRequest, 
    onUnfollowRequest, 
    l 
}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const previousOpen = useRef(open);

    useEffect(() => {
        if (previousOpen && previousOpen.current === true && open === false) {
            anchorRef.current && anchorRef.current.focus();
        }

        previousOpen.current = open;
    }, [open]);

    const handleListKeyDown = event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    };

    return (
        <>
            <IconButton
                ref={anchorRef}
                ria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <ExpandMoreIcon />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                style={{ zIndex: 10 }}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper className={classes.paper}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <SadIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {l('status.menu.not-interested')}
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <EmbedIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {l('status.menu.embed')}
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem
                                        disabled={currentUserIsAuthor}
                                        onClick={event => {
                                            if (!currentUserIsAuthor) {
                                                currentUserFollowsAuthor 
                                                    ? onUnfollowRequest(statusId, username) 
                                                    : onFollowRequest(statusId);
                                                handleClose(event);
                                            }
                                        }}
                                    >
                                        <ListItemIcon>
                                            {(currentUserFollowsAuthor || currentUserIsAuthor) ? <UnfollowIcon /> : <PersonAddOutlinedIcon />}
                                        </ListItemIcon>
                                        <ListItemText>
                                            {(currentUserFollowsAuthor || currentUserIsAuthor) ? l('status.menu.unfollow-author') : l('status.menu.follow-author')}
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <MuteIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {l('status.menu.mute-author')}
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <BlockIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {l('status.menu.block-author')}
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <ReportIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {l('status.menu.report')}
                                        </ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export const StatusMenu = localized(_StatusMenu);
