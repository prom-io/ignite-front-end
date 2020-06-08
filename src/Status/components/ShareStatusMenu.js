import React, { useRef, useState } from 'react';
import {
    ClickAwayListener,
    IconButton,
    Popper,
    Typography,
    makeStyles,
} from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';
import { LetterIcon } from '../../icons/LetterIcon';
import { ShareIcon } from '../../icons/ShareIcon';
import { AnotherShareIcon } from '../../icons/AnotherShareIcon';
import { localized } from '../../localization/components';

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

const _ShareStatusMenu = ({ currentUser, l }) => {
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
                    <ClickAwayListener onClickAway={handleClose}>
                        <div
                            className="status-list-bottom-box-modal"
                            onClick={handleClose}
                        >
                            <div
                                className="status-modal-box-item"
                                onClick={handleClose}
                            >
                                <LetterIcon />
                                <Typography variant="body1" color="textSecondary">
                                    {l('status.send-in-message')}
                                </Typography>
                            </div>
                            <div
                                className="status-modal-box-item"
                                onClick={handleClose}
                            >
                                <ShareIcon />
                                <Typography variant="body1" color="textSecondary">
                                    {l('status.copy-link')}
                                </Typography>
                            </div>
                        </div>
                    </ClickAwayListener>
                </Popper>
            </div>
        </ClickEventPropagationStopper>
    );
};

const mampMobxToProps = ({ authorization }) => ({
    currentUser: authorization.currentUser,
});

export const ShareStatusMenu = localized(
    inject(mampMobxToProps)(observer(_ShareStatusMenu)),
);
