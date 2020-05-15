import React, { Fragment, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { StatusListItem } from './StatusListItem';

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
    const trackScrolling = () => {
        const element = document.getElementById('statusList');

        if (element.getBoundingClientRect().bottom <= window.innerHeight) {
            onNextPageRequest();
        }
    };


    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);

        return () => document.removeEventListener('scroll', trackScrolling);
    });

    return (
        <div id="statusList" className="status-list-card paddingBottomRoot">
            {header && statuses.length !== 0 && <Typography variant="h6">{header}</Typography>}
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
        </div>
    );
};
