import React, { useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import {
    Avatar,
    ClickAwayListener,
    Divider,
    Grow,
    IconButton,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Grid
} from "@material-ui/core";
import {Link} from "mobx-router";
import {Routes} from "../../routes";
import {LogoutMenuItem} from "../../Authorization/components";

const _UserAppBarMenu = ({currentUser, routerStore}) => {

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

    if (!currentUser) {
        return null;
    }

    return (
        <Grid >
            <Grid className="user-app-bar-menu">
                <IconButton ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            className="user-app-bar-menu-button"
                >
                    <Avatar src={currentUser.avatar}/>
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
                                        <Link view={Routes.userProfile}
                                            params={{username: currentUser.username}}
                                            store={routerStore}
                                            style={{
                                                textDecoration: "none",
                                                color: "inherit"
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <ListItemText>
                                                    Profile
                                                </ListItemText>
                                            </MenuItem>
                                        </Link>
                                        <Divider/>
                                        <MenuItem disabled>
                                            <ListItemText>
                                                Muted users
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem disabled>
                                            <ListItemText>
                                                Blocked users
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <ListItemText>
                                                Terms and policies
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem disabled>
                                            <ListItemText>
                                                Help center
                                            </ListItemText>
                                        </MenuItem>
                                        <Divider/>
                                        <LogoutMenuItem onClick={handleClose}/>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    )
};

const mapMobxToProps = ({authorization, store}) => ({
    currentUser: authorization.currentUser,
    routerStore: store
});

export const UserAppBarMenu = inject(mapMobxToProps)(observer(_UserAppBarMenu));
