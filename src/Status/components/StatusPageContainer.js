import React from "react";
import {inject, observer} from "mobx-react";
import {CircularProgress, Typography} from "@material-ui/core";
import {StatusListItem} from "./StatusListItem";
import {StatusMenu} from "./StatusMenu";

const getLabelFromError = error => {
    if (error.response) {
        if (error.response.status === 404) {
            return "Status not found";
        } else {
            return `Could not load status, server responded with ${error.response.status} status`;
        }
    } else {
        return "Could not load status, server is unreachable";
    }
};

const _StatusPageContainer = ({
    status,
    pending,
    error,
    statusLikePending,
    statusAuthorSubscriptionPending,
    currentUser,
    followStatusAuthor,
    unfollowStatusAuthor,
    favouriteStatus,
    unfavouriteStatus
}) => {
    if (pending) {
        return <CircularProgress size={25} color="primary"/>
    }

    if (error) {
        return (
            <Typography variant="body1">
                {getLabelFromError(error)}
            </Typography>
        )
    }

    const handleFavouriteStatusChange = () => {
        if (status.favourited) {
            unfavouriteStatus();
        } else {
            favouriteStatus();
        }
    };

    if (!status) {
        return null;
    }

    return (
        <StatusListItem status={status}
                        statusLikePending={statusLikePending}
                        onUnfollowRequest={unfollowStatusAuthor}
                        onFollowRequest={followStatusAuthor}
                        onFavouriteStatusChange={handleFavouriteStatusChange}
                        currentUserIsAuthor={currentUser && currentUser.id === status.account.id}
                        displayMenu={Boolean(currentUser)}
        />
    )
};

const mapMobxToProps = ({statusPage, authorization}) => ({
    status: statusPage.status,
    pending: statusPage.pending,
    error: statusPage.error,
    statusLikePending: statusPage.statusLikePending,
    statusAuthorSubscriptionPending: statusPage.statusAuthorSubscriptionPending,
    currentUser: authorization.currentUser,
    followStatusAuthor: statusPage.followStatusAuthor,
    unfollowStatusAuthor: statusPage.unfollowStatusAuthor,
    favouriteStatus: statusPage.favouriteStatus,
    unfavouriteStatus: statusPage.unfavouriteStatus
});

export const StatusPageContainer = inject(mapMobxToProps)(observer(_StatusPageContainer));
