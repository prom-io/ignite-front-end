import React, { useRef, useState, useEffect } from "react";
import {
    ClickAwayListener,
    IconButton,
    Popper,
    Paper,
    Grow,
    MenuList,
    makeStyles
} from "@material-ui/core";

import { ShareWithLink } from "./ShareWithLink";
import { ShareToItem } from "./ShareToItem";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";
import { AnotherShareIcon } from "../../icons/AnotherShareIcon";

const useStyles = makeStyles({
    styledIconButton: {
        margin: 0,
        padding: 0,
        borderRadius: 100,
        width: 34,
        height: 34,
        "&:hover": {
            background: "rgba(255, 92, 1, 0.2)",
            borderRadius: 30
        }
    },
    paper: {
        boxShadow: "0 0 5px rgba(0,0,0,0.2)"
    }
});

export const ShareStatusMenu = ({ status }) => {
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

    return (
        <ClickEventPropagationStopper>
            <ClickEventPropagationStopper>
                <IconButton
                    classes={{ root: classes.styledIconButton }}
                    ref={anchorRef}
                    onClick={handleToggle}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                >
                    <AnotherShareIcon />
                </IconButton>
            </ClickEventPropagationStopper>
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
                                placement === "bottom"
                                    ? "center top"
                                    : "center bottom"
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
                                >
                                    <ClickEventPropagationStopper>
                                        <ShareWithLink
                                            status={status}
                                            setOpen={setOpen}
                                        />
                                    </ClickEventPropagationStopper>
                                    <ClickEventPropagationStopper>
                                        <ShareToItem
                                            to="Facebook"
                                            status={status}
                                            setOpen={setOpen}
                                        />
                                    </ClickEventPropagationStopper>
                                    <ClickEventPropagationStopper>
                                        <ShareToItem
                                            to="Twitter"
                                            status={status}
                                            setOpen={setOpen}
                                        />
                                    </ClickEventPropagationStopper>
                                    <ClickEventPropagationStopper>
                                        <ShareToItem
                                            to="LinkedIn"
                                            status={status}
                                            setOpen={setOpen}
                                        />
                                    </ClickEventPropagationStopper>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </ClickEventPropagationStopper>
    );
};
