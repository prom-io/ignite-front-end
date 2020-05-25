import React, { Fragment } from 'react';
import { CircularProgress, Typography, makeStyles } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { StatusListItem } from './StatusListItem';

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
}) => {
    const classes = useStyles({radius: 55});

    return (
        <div id="statusList" className="status-list-card paddingBottomRoot">
            {header && statuses.length !== 0 && <Typography variant="h6">{header}</Typography>}
            <InfiniteScroll
                next={onNextPageRequest}
                hasMore
                loader={<CircularProgress size={15} color="primary" className={classes.centered} />}
                dataLength={statuses.length}
                style={{ overflowY: 'hidden' }}
            >
                {statuses.map(status => (
                    <Fragment key={status.id}>
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
