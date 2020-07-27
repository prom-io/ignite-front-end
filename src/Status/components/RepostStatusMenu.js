import React, { useRef, useState, useEffect } from "react";
import {
    ClickAwayListener,
    IconButton,
    Popper,
    Paper,
    Grow,
    MenuList,
    Typography,
    makeStyles
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { RepostWithoutCommentMenuItem } from "./RepostWithoutCommentMenuItem";
import { RepostWithCommentMenuItem } from "./RepostWithCommentMenuItem";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";
import { RepostIcon } from "../../icons/RepostIcon";
import { UndoRepostMenuItem } from "./UndoRepostMenuItem";
import Loader from "../../components/Loader";

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

const _RepostStatusMenu = ({
    status,
    repostPending,
    canBeReposted,
    currentUserIsAuthor,
    currentUser,
    setGenericAuthorizationDialogOpen,
    setGenericAuthorizationDialogType
}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        if (!currentUser) {
            setGenericAuthorizationDialogOpen(true);
            setGenericAuthorizationDialogType("login");
            return;
        }
        canBeReposted && setOpen(prevOpen => currentUser && !prevOpen);
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
        <div className="status-list-bottom-box">
            {repostPending ? (
                <Loader css="transform: scale(0.3); top:5px; left:5px" />
            ) : (
                <IconButton
                    classes={{ root: classes.styledIconButton }}
                    ref={anchorRef}
                    onClick={handleToggle}
                    aria-controls={open ? "menu-list-grow" : undefined}
                    aria-haspopup="true"
                >
                    <RepostIcon
                        reposted={
                            currentUser &&
                            !canBeReposted &&
                            status.reposted &&
                            !currentUserIsAuthor
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
                                <MenuList autoFocusItem={open} id="menu-list-grow">
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
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

const mampMobxToProps = ({ authorization, genericAuthorizationDialog }) => ({
    currentUser: authorization.currentUser,
    setGenericAuthorizationDialogOpen:
        genericAuthorizationDialog.setGenericAuthorizationDialogOpen,
    setGenericAuthorizationDialogType:
        genericAuthorizationDialog.setGenericAuthorizationDialogType
});

export const RepostStatusMenu = inject(mampMobxToProps)(observer(_RepostStatusMenu));
