
import React, {Fragment, useEffect, useRef, useState} from "react";
import {CardActions, Checkbox, CircularProgress, Typography} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {LetterIcon} from '../../icons/LetterIcon';
import {ShareIcon} from '../../icons/ShareIcon';
import { RepostIcon } from "../../icons/RepostIcon";
import { PenIcon } from "../../icons/PenIcon";
import {
    ClickAwayListener,
    Grow,
    IconButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Popper
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

export const StatusBottom = ({
    favourited,
    onFavouriteClick,
    statusId,
    favouritesCount,
    statusLikePending
}) => (
    <CardActions  className="status-list-bottom-container">
        <div className="status-list-bottom-box">
            <img src="./status-buttons-comments.png" onClick/>
            <Typography variant="body1" color={"textSecondary"}>
                0
            </Typography>
        
        </div>
        <div className="status-list-bottom-box">
            <img src="./status-buttons-retwits.png" />
            <Typography variant="body1" color={"textSecondary"}>
                0
            </Typography>
           
        </div>
        <div className="status-list-bottom-box">
            {statusLikePending
                ? <CircularProgress size={20} color="primary"/>
                : <Checkbox icon={<FavoriteBorderIcon/>}
                            checkedIcon={<FavoriteIcon color="primary"/>}
                            checked={favourited}
                            onChange={() => onFavouriteClick(statusId, !favourited)}
                />
            }
            <Typography variant="body1" color={favourited ? "primary" : "textSecondary"}>
                {favouritesCount}
            </Typography>
        </div>
        <div className="status-list-bottom-box">
            <img src="./status-buttons-share.png" />
                <Typography variant="body1" color={"textSecondary"}>
                    0
                </Typography>
        </div>
    </CardActions>
);
