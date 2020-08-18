import React from "react";
import { FadeLoader } from "react-spinners";
import {
    CardActions,
    Checkbox,
    Typography,
    makeStyles,
    useTheme
} from "@material-ui/core";

import { OpenStatusBtfsInfoDialogButton } from "./OpenStatusBtfsInfoDialogButton";
import { RepostStatusMenu } from "./RepostStatusMenu";
import { ShareStatusMenu } from "./ShareStatusMenu";
import { CommentsButton } from "./CommentsButton";
import { ClickEventPropagationStopper } from "../../ClickEventProgatationStopper";
import { FavoriteIcon } from "../../icons/FavoriteIcon";

const useStyles = makeStyles({
    styledCheckbox: {
        margin: 0,
        padding: 0,
        borderRadius: 100,
        width: 34,
        height: 34,
        "&.MuiCheckbox-root": {
            color: "rgba(0, 0, 0, 0.35)"
        },
        "&:hover": {
            background: "rgba(255, 92, 1, 0.2)",
            borderRadius: 30
        }
    },
    cardActionSpacing: {
        "& > :not(:first-child)": {
            marginLeft: "18px"
        }
    },
    progress: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 34,
        height: 34
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
    currentUserIsAuthor,
    status,
    currentUser,
    setGenericAuthorizationDialogOpen,
    setGenericAuthorizationDialogType,
    isMeme
}) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleFavoriteClick = () => {
        if (!currentUser) {
            setGenericAuthorizationDialogOpen(true);
            setGenericAuthorizationDialogType("login");
            return;
        }
        onFavouriteClick(statusId, !favourited);
    };

    return (
        <ClickEventPropagationStopper>
            <CardActions
                className="status-list-bottom-container"
                classes={{ spacing: classes.cardActionSpacing }}
            >
                <ClickEventPropagationStopper>
                    <CommentsButton status={status} />
                </ClickEventPropagationStopper>
                {!isMeme && (
                    <RepostStatusMenu
                        status={status}
                        repostPending={repostPending}
                        canBeReposted={canBeReposted}
                        currentUserIsAuthor={currentUserIsAuthor}
                    />
                )}
                {!(isMeme && favouritesCount !== null) && (
                    <div>
                        <ClickEventPropagationStopper className="status-list-bottom-box">
                            {statusLikePending ? (
                                <div className={classes.progress}>
                                    <FadeLoader
                                        css="transform: scale(0.3); top:5px; left:5px"
                                        color={theme.palette.primary.main}
                                    />
                                </div>
                            ) : (
                                <Checkbox
                                    icon={<FavoriteIcon color={favourited} />}
                                    checkedIcon={<FavoriteIcon type="primary" />}
                                    checked={favourited}
                                    onChange={handleFavoriteClick}
                                    classes={{ root: classes.styledCheckbox }}
                                />
                            )}
                            <Typography
                                variant="body1"
                                color={favourited ? "primary" : "textSecondary"}
                            >
                                {favouritesCount === null ? "???" : favouritesCount}
                            </Typography>
                        </ClickEventPropagationStopper>
                    </div>
                )}
                <ShareStatusMenu status={status} />
                <ClickEventPropagationStopper className="status-list-bottom-box">
                    <OpenStatusBtfsInfoDialogButton btfsInfo={btfsInfo} />
                </ClickEventPropagationStopper>
            </CardActions>
        </ClickEventPropagationStopper>
    );
};

export const StatusBottom = _StatusBottom;
