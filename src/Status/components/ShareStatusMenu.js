import React, { useRef, useState } from 'react';
import {
    ClickAwayListener,
    IconButton,
    Popper,
    makeStyles,
} from '@material-ui/core';
import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';
import { AnotherShareIcon } from '../../icons/AnotherShareIcon';
import { ShareWithLink } from './ShareWithLink';
import { ShareToItem } from './ShareToItem';
import { useAuthorization } from '../../store';

const useStyles = makeStyles({
    styledIconButton: {
        margin: 0,
        padding: 0,
        borderRadius: 100,
        width: 34,
        height: 34,
        '&:hover': {
            background: 'rgba(255, 92, 1, 0.2)',
            borderRadius: 30,
        },
    },
});

export const ShareStatusMenu = ({ status }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const classes = useStyles();
    const { currentUser } = useAuthorization();

    const handleToggle = () => {
        setOpen(prevOpen => currentUser && !prevOpen);
    };

    const handleClose = event => {
        if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <ClickEventPropagationStopper className="status-list-bottom-box">
            <div>
                <ClickEventPropagationStopper>
                    <IconButton
                        ref={anchorRef}
                        onClick={event => {
                            handleToggle(event);
                        }}
                        classes={{ root: classes.styledIconButton }}
                        disableRipple
                    >
                        <AnotherShareIcon />
                    </IconButton>
                </ClickEventPropagationStopper>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                >
                    <ClickEventPropagationStopper>
                        <ClickAwayListener
                            onClickAway={handleClose}
                            touchEvent="onTouchStart"
                            mouseEvent="onMouseDown"
                        >
                            <div
                                className="status-list-bottom-box-modal"
                                style={{ padding: 0 }}
                                onClick={handleClose}
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
                            </div>
                        </ClickAwayListener>
                    </ClickEventPropagationStopper>
                </Popper>
            </div>
        </ClickEventPropagationStopper>
    );
};
