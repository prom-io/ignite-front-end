import React, {Fragment, useEffect} from "react";
import {Card, Divider} from "@material-ui/core";
import {StatusListItem} from "./StatusListItem";

export const StatusList = ({
    statuses,
    onFavouriteClick,
    pending,
    hasNewStatuses,
    onShowNewStatusesClick,
    currentUser,
    displayMenu,
    onFollowRequest,
    onUnfollowRequest,
    onNextPageRequest
}) => {
    let trackScrolling = () => {
        const element = document.body;

        if (element.getBoundingClientRect().bottom <= window.innerHeight) {
            onNextPageRequest();
        }
    };

    useEffect(() =>{
        document.addEventListener("scroll", trackScrolling);

        return () => document.removeEventListener("scroll", trackScrolling);
    });

    return (
        <Card id="statusList" className="status-list-card border">
            {statuses.map(status => (
                <Fragment key={status.id}>
                    <StatusListItem status={status}
                                    onFavouriteStatusChange={onFavouriteClick}
                                    onFollowRequest={onFollowRequest}
                                    onUnfollowRequest={onUnfollowRequest}
                                    displayMenu={displayMenu}
                                    currentUserIsAuthor={currentUser && currentUser.id === status.account.id}
                    />
                    <Divider/>
                </Fragment>
            ))}
        </Card>
    );
};
