import React, {useRef, useState} from "react";
import {ClickAwayListener, IconButton, Popper, Typography, CircularProgress} from "@material-ui/core";
import {RepostCommentWithoutCommentMenuItem} from "./RepostCommentWithoutCommentMenuItem";
import {RepostCommentWithCommentMenuItem} from "./RepostCommentWithCommentMenuItem";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {RepostIcon} from "../../icons/RepostIcon";

export const RepostCommentMenu = ({comment, repostPending}) => {
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
                {comment.reposts_count}
            </Typography>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                <ClickEventPropagationStopper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <div className="status-list-bottom-box-modal" onClick={handleClose}>
                            <ClickEventPropagationStopper>
                                <RepostCommentWithoutCommentMenuItem comment={comment}
                                                                     onClick={handleClose}
                                />
                            </ClickEventPropagationStopper>
                            <ClickEventPropagationStopper>
                                <RepostCommentWithCommentMenuItem comment={comment}
                                                                  onClick={handleClose}
                                />
                            </ClickEventPropagationStopper>
                        </div>
                    </ClickAwayListener>
                </ClickEventPropagationStopper>
            </Popper>
        </div>
    )
};
