import React from "react";
import {CardActions, Checkbox, Typography} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export const StatusBottom = ({
    favourited,
    onFavouriteClick,
    statusId,
    favouritesCount
}) => (
    <CardActions  className="status-list-bottom-container">
        <Checkbox icon={<FavoriteBorderIcon/>}
                  checkedIcon={<FavoriteIcon color="primary"/>}
                  checked={favourited}
                  onChange={() => onFavouriteClick(statusId, !favourited)}
        />
        <Typography variant="body1" color={favourited ? "primary" : "textSecondary"}>
            {favouritesCount}
        </Typography>
    </CardActions>
);
