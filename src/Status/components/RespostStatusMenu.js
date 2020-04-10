import React, {useRef, useState} from "react";
import {ClickAwayListener, IconButton, Popper, Typography} from "@material-ui/core";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {RepostIcon} from "../../icons/RepostIcon";
import {PenIcon} from "../../icons/PenIcon";
import {RepostWithoutCommentMenuItem} from "./RepostWithoutCommentMenuItem";

export const RepostStatusMenu = ({status}) => {
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

    return (
        <div className="status-list-bottom-box">
            <IconButton ref={anchorRef}
                        onClick={handleToggle}
            >
                <RepostIcon/>
            </IconButton>
            <Typography variant="body1" color={"textSecondary"}>
                0
            </Typography>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                <ClickEventPropagationStopper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <div className="status-list-bottom-box-modal" onClick={handleClose}>
                            <ClickEventPropagationStopper>
                                <RepostWithoutCommentMenuItem status={status}
                                                              onClick={handleClose}
                                />
                            </ClickEventPropagationStopper>
                            <ClickEventPropagationStopper>
                                <div className="status-modal-box-item" onClick={handleClose}>
                                    <PenIcon/>
                                    <Typography variant="body1" color={"textSecondary"}>
                                        Repost with comment
                                    </Typography>
                                </div>
                            </ClickEventPropagationStopper>
                        </div>
                    </ClickAwayListener>
                </ClickEventPropagationStopper>
            </Popper>
        </div>
    )
};
