import React from "react";
import {CardActions, Checkbox, Typography, CircularProgress} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export const StatusBottom = ({
    favourited,
    onFavouriteClick,
    statusId,
    favouritesCount,
    statusLikePending
}) => (
    <CardActions  className="status-list-bottom-container">
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
    </CardActions>
);
