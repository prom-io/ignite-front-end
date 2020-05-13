import React, {useRef, useState} from "react";
import {
    CardActions,
    Checkbox,
    CircularProgress,
    ClickAwayListener,
    IconButton,
    Popper,
    Typography,
    makeStyles
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {OpenStatusBtfsInfoDialogButton} from "./OpenStatusBtfsInfoDialogButton";
import {RepostStatusMenu} from "./RespostStatusMenu";
import {CommentsButton} from "./CommentsButton";
import {LetterIcon} from '../../icons/LetterIcon';
import {ShareIcon} from '../../icons/ShareIcon';
import {AnotherShareIcon} from "../../icons/AnotherShareIcon";
import {ClickEventPropagationStopper} from "../../ClickEventProgatationStopper";
import {localized} from "../../localization/components";

const useStyles = makeStyles({
    styledCheckbox: {
        '&.MuiCheckbox-root': {
            color: 'rgba(0, 0, 0, 0.35)'
        },
    },
    correctBorderRadius: {
        borderRadius: 0
    }
});

const _StatusBottom = ({
    favourited,
    onFavouriteClick,
    statusId,
    favouritesCount,
    statusLikePending,
    btfsInfo,
    repostPending,
    canBeReposted,
    status,
    l
}) => {

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

    return (
        <ClickEventPropagationStopper>
            <CardActions  className="status-list-bottom-container">
                <ClickEventPropagationStopper>
                    <CommentsButton status={status}/>
                </ClickEventPropagationStopper>
                <RepostStatusMenu status={status}
                                  repostPending={repostPending}
                                  canBeReposted={canBeReposted}
                />
                <div>
                    <ClickEventPropagationStopper className="status-list-bottom-box">
                        {statusLikePending
                            ? <CircularProgress size={20} color="primary"/>
                            : (
                                <Checkbox icon={<FavoriteBorderIcon/>}
                                          checkedIcon={<FavoriteIcon color="primary"/>}
                                          checked={favourited}
                                          onChange={() => onFavouriteClick(statusId, !favourited)}
                                          className={classes.styledCheckbox}
                                />
                            )
                        }
                        <Typography variant="body1" color={favourited ? "primary" : "textSecondary"} >
                            {favouritesCount}
                        </Typography>
                    </ClickEventPropagationStopper>
                </div>
                <ClickEventPropagationStopper className="status-list-bottom-box">
                    <div>
                        <ClickEventPropagationStopper>
                            <IconButton ref={anchorRef}
                                        className={classes.correctBorderRadius}
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
                                            {l("status.send-in-message")}
                                        </Typography>
                                    </div>
                                    <div className="status-modal-box-item" onClick={handleClose}>
                                        <ShareIcon/>
                                        <Typography variant="body1" color={"textSecondary"}>
                                            {l("status.copy-link")}
                                        </Typography>
                                    </div>
                                </div>
                            </ClickAwayListener>
                        </Popper>
                    </div>
                </ClickEventPropagationStopper>
                <ClickEventPropagationStopper className="status-list-bottom-box">
                    <OpenStatusBtfsInfoDialogButton btfsInfo={btfsInfo}/>
                </ClickEventPropagationStopper>
            </CardActions>
        </ClickEventPropagationStopper>
    );
};

export const StatusBottom = localized(_StatusBottom);
