import React, { Fragment } from 'react';
import { CircularProgress, Typography, Hidden, makeStyles } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FadeLoader } from 'react-spinners';
import { StatusListItem } from './StatusListItem';
import { WhoToFollow } from '../../Follow/components/WhoToFollow';
import useTheme from '@material-ui/core/styles/useTheme';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
}));

export const StatusList = ({
    statuses,
    onFavouriteClick,
    statusLikePendingMap,
    repostsPendingMap,
    currentUser,
    displayMenu,
    onFollowRequest,
    onUnfollowRequest,
    onNextPageRequest,
    header,
    hideThreadLinks,
    hasMore,
}) => {
    const classes = useStyles({ radius: 55 });
    const theme = useTheme();

    return (
        <div id="statusList" className="status-list-card paddingBottomRoot">
            {header && statuses.length !== 0 && <Typography variant="h6">{header}</Typography>}
            <InfiniteScroll
                next={onNextPageRequest}
                hasMore={hasMore}
                loader={<div className={classes.centered}><FadeLoader css="transform: scale(0.5)" color={theme.palette.primary.main} /></div>}
                dataLength={statuses.length}
                style={{ overflowY: 'hidden' }}
            >
                {statuses.map((status, index) => (
                    <Fragment key={status.id}>
                        {currentUser && index === 5 && <Hidden lgUp><WhoToFollow isMobile /></Hidden>}
                        <StatusListItem
                            status={status}
                            onFavouriteStatusChange={onFavouriteClick}
                            onFollowRequest={onFollowRequest}
                            onUnfollowRequest={onUnfollowRequest}
                            displayMenu={displayMenu}
                            currentUserIsAuthor={currentUser && currentUser.id === status.account.id}
                            statusLikePending={statusLikePendingMap[status.id]}
                            repostPending={repostsPendingMap[status.id]}
                            link
                            hideThreadLink={hideThreadLinks}
                        />
                    </Fragment>
                ))}
            </InfiniteScroll>
        </div>
    );
};
