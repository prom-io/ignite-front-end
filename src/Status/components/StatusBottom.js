import React from 'react';
import {
    CardActions,
    Checkbox,
    CircularProgress,
    Typography,
    makeStyles,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { FadeLoader } from 'react-spinners';
import { OpenStatusBtfsInfoDialogButton } from './OpenStatusBtfsInfoDialogButton';
import { RepostStatusMenu } from './RepostStatusMenu';
import { ShareStatusMenu } from './ShareStatusMenu';
import { CommentsButton } from './CommentsButton';
import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles({
    styledCheckbox: {
        margin: 0,
        padding: 0,
        borderRadius: 100,
        width: 34,
        height: 34,
        '&.MuiCheckbox-root': {
            color: 'rgba(0, 0, 0, 0.35)',
        },
        '&:hover': {
            background: 'rgba(255, 92, 1, 0.2)',
            borderRadius: 30,
        },
    },
    cardActionSpacing: {
        '& > :not(:first-child)': {
            marginLeft: '25px',
        },
    },
    progress: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
    },
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
}) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ClickEventPropagationStopper>
            <CardActions
                className="status-list-bottom-container"
                classes={{ spacing: classes.cardActionSpacing }}
            >
                <ClickEventPropagationStopper>
                    <CommentsButton status={status} />
                </ClickEventPropagationStopper>
                <RepostStatusMenu
                    status={status}
                    repostPending={repostPending}
                    canBeReposted={canBeReposted}
                    currentUserIsAuthor={currentUserIsAuthor}
                />
                <div>
                    <ClickEventPropagationStopper className="status-list-bottom-box">
                        {statusLikePending ? (
                            <div className={classes.progress}>
                                <FadeLoader css="transform: scale(0.3); top:5px; left:5px" color={theme.palette.primary.main} />
                            </div>
                        ) : (
                            <Checkbox
                                icon={<FavoriteBorderIcon />}
                                checkedIcon={<FavoriteIcon color="primary" />}
                                checked={favourited}
                                onChange={() => onFavouriteClick(statusId, !favourited)}
                                classes={{ root: classes.styledCheckbox }}
                            />
                        )}
                        <Typography
                            variant="body1"
                            color={favourited ? 'primary' : 'textSecondary'}
                        >
                            {favouritesCount}
                        </Typography>
                    </ClickEventPropagationStopper>
                </div>
                <ShareStatusMenu status={status} />
                <ClickEventPropagationStopper className="status-list-bottom-box">
                    <OpenStatusBtfsInfoDialogButton btfsInfo={btfsInfo} />
                </ClickEventPropagationStopper>
            </CardActions>
        </ClickEventPropagationStopper>
    );
};

export const StatusBottom = _StatusBottom;
