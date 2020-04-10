import React, {useRef, useState} from "react";
import {
    CardActions,
    Checkbox,
    CircularProgress,
    ClickAwayListener,
    IconButton,
    Popper,
    Typography
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {LetterIcon} from '../../icons/LetterIcon';
import {ShareIcon} from '../../icons/ShareIcon';
import {AnotherShareIcon} from "../../icons/AnotherShareIcon";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {CommentIcon} from "../../icons/CommentIcon";
import {RepostStatusMenu} from "./RespostStatusMenu";

export const StatusBottom = ({
    favourited,
    onFavouriteClick,
    statusId,
    favouritesCount,
    statusLikePending,
    repostPending,
    status
}) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = event => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (event && anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <ClickEventPropagationStopper>
            <CardActions  className="status-list-bottom-container">
                <div className="status-list-bottom-box">
                    <CommentIcon/>
                    <Typography variant="body1" color={"textSecondary"}>
                        0
                    </Typography>
                </div>
                <RepostStatusMenu status={status}/>
                <div className="status-list-bottom-box">
                    {statusLikePending
                        ? <CircularProgress size={20} color="primary"/>
                        : (
                            <ClickEventPropagationStopper>
                                <Checkbox icon={<FavoriteBorderIcon/>}
                                          checkedIcon={<FavoriteIcon color="primary"/>}
                                          checked={favourited}
                                          onChange={() => onFavouriteClick(statusId, !favourited)}
                                />
                            </ClickEventPropagationStopper>
                        )
                    }
                    <Typography variant="body1" color={favourited ? "primary" : "textSecondary"}>
                        {favouritesCount}
                    </Typography>
                </div>
                <ClickEventPropagationStopper className="status-list-bottom-box">
                    <div>
                        <ClickEventPropagationStopper>
                            <IconButton ref={anchorRef}
                                        onClick={event => {
                                            handleToggle(event);
                                        }}
                                        disableRipple
                            >
                                <AnotherShareIcon/>
                            </IconButton>
                        </ClickEventPropagationStopper>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                            <ClickAwayListener onClickAway={handleClose}>
                                <div className="status-list-bottom-box-modal" onClick={handleClose}>
                                    <div className="status-modal-box-item" onClick={handleClose}>
                                        <LetterIcon />
                                        <Typography variant="body1" color={"textSecondary"}>
                                            Send in message
                                        </Typography>
                                    </div>
                                    <div className="status-modal-box-item" onClick={handleClose}>
                                        <ShareIcon/>
                                        <Typography variant="body1" color={"textSecondary"}>
                                            Copy link
                                        </Typography>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </Popper>
                    </div>
                </ClickEventPropagationStopper>
            </CardActions>
        </ClickEventPropagationStopper>
    );
};
