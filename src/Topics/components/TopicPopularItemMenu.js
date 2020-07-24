import React, { useEffect, useRef, useState } from 'react';
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
    useTheme,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { SadIcon } from '../../icons/SadIcon';

import { localized } from '../../localization/components';

const useStyles = makeStyles({
    iconArrow: {
        padding: '6px',
        margin: '6px',
        position: 'absolute',
        top: 0,
        right: 0,
    },
    paper: {
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
    },
    menuList: {
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    menuIcon: {
        minWidth: '24px',
    },
    menuContent: {
        '& span': {
            fontSize: '15px',
        },
    },
});

const _TopicPopularItemMenu = ({ topicId, l }) => {
    const classes = useStyles();
    const theme = useTheme();
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
                className={classes.iconArrow}
                ref={anchorRef}
                ria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                <ArrowDropDownIcon style={{ color: theme.palette.text.secondary }} />
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
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}
                    >
                        <Paper className={classes.paper}>
                            <ClickAwayListener
                                onClickAway={handleClose}
                                touchEvent="onTouchStart"
                                mouseEvent="onMouseDown"
                            >
                                <MenuList
                                    autoFocusItem={open}
                                    id="menu-list-grow"
                                    style={{ padding: 0 }}
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem className={classes.menuList}>
                                        <ListItemIcon className={classes.menuIcon}>
                                            <SadIcon />
                                        </ListItemIcon>
                                        <ListItemText className={classes.menuContent}>
                                            {l('topics.card.menu.spam')}
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem className={classes.menuList}>
                                        <ListItemIcon className={classes.menuIcon}>
                                            <SadIcon />
                                        </ListItemIcon>
                                        <ListItemText className={classes.menuContent}>
                                            {l('topics.card.menu.harmful')}
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem className={classes.menuList}>
                                        <ListItemIcon className={classes.menuIcon}>
                                            <SadIcon />
                                        </ListItemIcon>
                                        <ListItemText className={classes.menuContent}>
                                            {l('topics.card.menu.duplicate')}
                                        </ListItemText>
                                    </MenuItem>
                                    <MenuItem className={classes.menuList}>
                                        <ListItemIcon className={classes.menuIcon}>
                                            <SadIcon />
                                        </ListItemIcon>
                                        <ListItemText className={classes.menuContent}>
                                            {l('topics.card.menu.quality')}
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

export const TopicPopularItemMenu = localized(_TopicPopularItemMenu);
