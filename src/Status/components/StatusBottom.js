import React from "react";
import {CardActions, Checkbox, Typography, makeStyles} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles(() => ({
    iconStyle: {
        width: "20px"
    }
}));

export const StatusBottom = ({
    favourited,
    onFavouriteClick,
    statusId,
    favouritesCount
}) => {
    const classes = useStyles();

    return(
        <CardActions  className="status-list-bottom-container">
            <div className="status-list-bottom-box">
                <img src="./status-buttons-comments.png" />
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
                <Checkbox icon={<FavoriteBorderIcon/>}
                        checkedIcon={<FavoriteIcon color="primary"/>}
                        checked={favourited}
                        onChange={() => onFavouriteClick(statusId, !favourited)}
                        className={classes.iconStyle}
                />
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
)};
