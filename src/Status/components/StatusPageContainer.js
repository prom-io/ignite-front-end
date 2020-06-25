import React from 'react';
import { inject, observer } from 'mobx-react';
import { Typography, makeStyles, Grid } from '@material-ui/core';
import { StatusListItem } from './StatusListItem';
import { StatusCommentsList } from './StatusCommentsList';
import { localized } from '../../localization/components';
import { BackButton } from '../../components/BackButton';
import { UnfollowDialog } from '../../Follow/components';
import Loader from '../../components/Loader';

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'table',
    },
}));

const getLabelFromError = error => {
    if (error.response) {
        if (error.response.status === 404) {
            return 'Status not found';
        }
        return `Could not load status, server responded with ${error.response.status} status`;
    }
    return 'Could not load status, server is unreachable';
};

const _StatusPageContainer = ({
    status,
    pending,
    error,
    statusLikePending,
    currentUser,
    followStatusAuthor,
    unfollowStatusAuthorWithDialog,
    favouriteStatus,
    unfavouriteStatus,
    currentStatusUsername,
    unfollowStatusAuthor,
    setUnfollowDialogOpen,
    unfollowDialogOpen,
    l,
}) => {
    const classes = useStyles();

    if (pending) {
        return <div className={classes.centered}><Loader size="lg" /></div>;
    }

    if (error) {
        return (
            <Typography variant="body1">
                {getLabelFromError(error)}
            </Typography>
        );
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
        <Grid container>
            <Grid xs={12}>
                <BackButton
                    title={status && status.status_reference_type === "COMMENT" ? "comment" : "post"}
                    style={{ marginLeft: '10px' }} />
            </Grid>
            <Grid item xs={12}>
                <StatusListItem
                    status={status}
                    statusLikePending={statusLikePending}
                    onUnfollowRequest={unfollowStatusAuthorWithDialog}
                    onFollowRequest={followStatusAuthor}
                    onFavouriteStatusChange={handleFavouriteStatusChange}
                    currentUserIsAuthor={currentUser && currentUser.id === status.account.id}
                    displayMenu={Boolean(currentUser)}
                />
                <UnfollowDialog
                    username={currentStatusUsername}
                    unfollowAction={unfollowStatusAuthor}
                    unfollowDialogOpen={unfollowDialogOpen}
                    setUnfollowDialogOpen={setUnfollowDialogOpen}
                />
            </Grid>
            <Grid item xs={12}>
                <StatusCommentsList />
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ statusPage, authorization }) => ({
    status: statusPage.status,
    pending: statusPage.pending,
    error: statusPage.error,
    statusLikePending: statusPage.statusLikePending,
    statusAuthorSubscriptionPending: statusPage.statusAuthorSubscriptionPending,
    currentUser: authorization.currentUser,
    followStatusAuthor: statusPage.followStatusAuthor,
    unfollowStatusAuthorWithDialog: statusPage.unfollowStatusAuthorWithDialog,
    favouriteStatus: statusPage.favouriteStatus,
    unfavouriteStatus: statusPage.unfavouriteStatus,
    currentStatusUsername: statusPage.currentStatusUsername,
    unfollowStatusAuthor: statusPage.unfollowStatusAuthor,
    setUnfollowDialogOpen: statusPage.setUnfollowDialogOpen,
    unfollowDialogOpen: statusPage.unfollowDialogOpen,
});

export const StatusPageContainer = localized(
    inject(mapMobxToProps)(observer(_StatusPageContainer)),
);
