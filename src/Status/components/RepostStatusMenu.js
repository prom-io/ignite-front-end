import React, { Fragment, useRef, useState } from "react";
import {
    ClickAwayListener,
    IconButton,
    Popper,
    Typography,
    CircularProgress,
    makeStyles
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { RepostWithoutCommentMenuItem } from "./RepostWithoutCommentMenuItem";
import { RepostWithCommentMenuItem } from "./RepostWithCommentMenuItem";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";
import { RepostIcon } from "../../icons/RepostIcon";
import { UndoRepostMenuItem } from "./UndoRepostMenuItem";
import { FadeLoader } from 'react-spinners';

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
    }
});

const _RepostStatusMenu = ({
    status,
    repostPending,
    canBeReposted,
    currentUserIsAuthor,
    currentUser
}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const classes = useStyles();

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
        <div className="status-list-bottom-box">
            {repostPending ? (
              <FadeLoader css={'transform: scale(0.5)'} color={'#FF5C01'}/>
            ) : (
                <IconButton
                    ref={anchorRef}
                    onClick={handleToggle}
                    classes={{ root: classes.styledIconButton }}
                >
                    <RepostIcon
                        reposted={
                            currentUser && !canBeReposted && !currentUserIsAuthor
                        }
                    />
                </IconButton>
            )}
            <Typography variant="body1" color="textSecondary">
                {status.reposts_count}
            </Typography>
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
                            onClick={handleClose}
                        >
                            {canBeReposted && (
                                <>
                                    <ClickEventPropagationStopper>
                                        <RepostWithoutCommentMenuItem
                                            status={status}
                                            onClick={handleClose}
                                        />
                                    </ClickEventPropagationStopper>
                                    <ClickEventPropagationStopper>
                                        <RepostWithCommentMenuItem
                                            status={status}
                                            onClick={handleClose}
                                        />
                                    </ClickEventPropagationStopper>
                                </>
                            )}
                            {!canBeReposted && (
                                <UndoRepostMenuItem onClick={handleClose} />
                            )}
                        </div>
                    </ClickAwayListener>
                </ClickEventPropagationStopper>
            </Popper>
        </div>
    );
};

const mampMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser
});

export const RepostStatusMenu = inject(mampMobxToProps)(observer(_RepostStatusMenu));