import React, {Fragment, useEffect, useRef, useState} from "react";
import {
    ClickAwayListener,
    Grow,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import {UnfollowIcon} from "../../icons/UnfollowIcon";
import {MuteIcon} from "../../icons/MuteIcon";
import {BlockIcon} from "../../icons/BlockIcon";
import {ReportIcon} from "../../icons/ReportIcon";
import {SadIcon} from "../../icons/SadIcon";
import {EmbedIcon} from "../../icons/EmbedIcon";

export const StatusMenu = ({currentUserFollowsAuthor, currentUserIsAuthor, statusId, onFollowRequest, onUnfollowRequest}) => {
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
        <Fragment>
            <IconButton ref={anchorRef}
                        ria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
            >
                <ExpandMoreIcon/>
            </IconButton>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <SadIcon/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Not interested
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <EmbedIcon/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Embed this post
                                        </ListItemText>
                                    </MenuItem>
                                    {!currentUserIsAuthor  && (
                                        <MenuItem onClick={event => {
                                            currentUserFollowsAuthor ? onUnfollowRequest(statusId) : onFollowRequest(statusId);
                                            handleClose(event)
                                        }}>
                                            <ListItemIcon>
                                                {currentUserFollowsAuthor ? <UnfollowIcon/> : <PersonAddOutlinedIcon/>}
                                            </ListItemIcon>
                                            <ListItemText>
                                                {currentUserFollowsAuthor ? "Unfollow author" : "Follow author"}
                                            </ListItemText>
                                        </MenuItem>
                                    )}
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <MuteIcon/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Mute author
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <BlockIcon/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Block author
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem disabled>
                                        <ListItemIcon>
                                            <ReportIcon/>
                                        </ListItemIcon>
                                        <ListItemText>
                                            Report abuse
                                        </ListItemText>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    )
};
