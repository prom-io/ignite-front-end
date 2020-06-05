import React, { useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';
import {
    Avatar,
    ClickAwayListener,
    Divider,
    Grid,
    Grow,
    IconButton,
    ListItemText,
    makeStyles,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from '@material-ui/core';
import { Link } from 'mobx-router';
import { Routes } from '../../routes';
import { LogoutMenuItem } from '../../Authorization/components';
import { localized } from '../../localization/components';

const useStyles = makeStyles(() => ({
    undecoratedLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    avatarIconButton: {
        padding: 0,
        width: '34px',
        height: '34px',
        '&>span': {
            width: '34px',
            height: '34px',
        },
    },
    avatarIcon: {
        width: '34px',
        height: '34px',
    },
}));

const _UserAppBarMenu = ({ currentUser, routerStore, l }) => {
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

    if (!currentUser) {
        return null;
    }

    return (
        <Grid>
            <Grid className="user-app-bar-menu">
                <IconButton
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    classes={{ root: classes.avatarIconButton }}
                >
                    <Avatar classes={{ root: classes.avatarIcon }} src={currentUser.avatar} style={{ border: '1px solid #F1EBE8' }} />
                </IconButton>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener 
                                    onClickAway={handleClose} 
                                    touchEvent="onTouchStart"
                                    mouseEvent="onMouseDown"
                                >
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <Link
                                            view={Routes.userProfile}
                                            params={{ username: currentUser.id }}
                                            store={routerStore}
                                            className={classes.undecoratedLink}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <ListItemText>
                                                    {l('menu.profile')}
                                                </ListItemText>
                                            </MenuItem>
                                        </Link>
                                        <Divider />
                                        <MenuItem disabled>
                                            <ListItemText>
                                                {l('menu.muted-users')}
                                            </ListItemText>
                                        </MenuItem>
                                        <MenuItem disabled>
                                            <ListItemText>
                                                {l('menu.blocked-users')}
                                            </ListItemText>
                                        </MenuItem>
                                        <Link
                                            view={Routes.terms}
                                            store={routerStore}
                                            className={classes.undecoratedLink}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <ListItemText>
                                                    {l('menu.terms-and-policies')}
                                                </ListItemText>
                                            </MenuItem>
                                        </Link>
                                        <MenuItem disabled>
                                            <ListItemText>
                                                {l('menu.help-center')}
                                            </ListItemText>
                                        </MenuItem>
                                        <Divider />
                                        <LogoutMenuItem onClick={handleClose} />
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ authorization, store }) => ({
    currentUser: authorization.currentUser,
    routerStore: store,
});

export const UserAppBarMenu = localized(
    inject(mapMobxToProps)(observer(_UserAppBarMenu)),
);
