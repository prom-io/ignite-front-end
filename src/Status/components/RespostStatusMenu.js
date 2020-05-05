import React, {Fragment, useRef, useState} from "react";
import {ClickAwayListener, IconButton, Popper, Typography, CircularProgress} from "@material-ui/core";
import {RepostWithoutCommentMenuItem} from "./RepostWithoutCommentMenuItem";
import {RepostWithCommentMenuItem} from "./RepostWithCommentMenuItem";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {RepostIcon} from "../../icons/RepostIcon";
import {UndoRepostMenuItem} from "./UndoRepostMenuItem";

export const RepostStatusMenu = ({status, repostPending, canBeReposted}) => {
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
            {repostPending
                ? <CircularProgress size={20} color="primary"/>
                :  (
                    <IconButton ref={anchorRef}
                                onClick={handleToggle}
                    >
                        <RepostIcon/>
                    </IconButton>
                )
            }
            <Typography variant="body1" color={"textSecondary"}>
                {status.reposts_count}
            </Typography>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                <ClickEventPropagationStopper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <div className="status-list-bottom-box-modal" onClick={handleClose}>
                            {canBeReposted && (
                                <Fragment>
                                    <ClickEventPropagationStopper>
                                        <RepostWithoutCommentMenuItem status={status}
                                                                      onClick={handleClose}
                                        />
                                    </ClickEventPropagationStopper>
                                    <ClickEventPropagationStopper>
                                        <RepostWithCommentMenuItem status={status}
                                                                   onClick={handleClose}
                                        />
                                    </ClickEventPropagationStopper>
                                </Fragment>
                            )}
                            {!canBeReposted && <UndoRepostMenuItem onClick={handleClose}/>}
                        </div>
                    </ClickAwayListener>
                </ClickEventPropagationStopper>
            </Popper>
        </div>
    )
};
