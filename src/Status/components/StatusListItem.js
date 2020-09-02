import React from "react";
import { inject } from "mobx-react";
import { Link } from "mobx-router";
import { Card } from "@material-ui/core";

import { StatusHeader } from "./StatusHeader";
import { StatusBottom } from "./StatusBottom";
import { StatusBody } from "./StatusBody";
import { Routes } from "../../routes";

const _StatusListItem = ({
    status,
    currentUserIsAuthor,
    onFavouriteStatusChange,
    displayMenu,
    onFollowRequest,
    onUnfollowRequest,
    statusLikePending,
    repostPending,
    link = false,
    routerStore,
    hideThreadLink,
    currentUser,
    setGenericAuthorizationDialogOpen,
    setGenericAuthorizationDialogType,
    isMeme = false
}) => {
    const content = (
        <Card elevation={0} className="statusCardBox">
            <StatusHeader
                username={status.account.username}
                userId={status.account.id}
                displayName={status.account.display_name}
                avatar={`${status.account.avatar}?size=${100}`}
                createdAt={status.created_at}
                statusId={status.id}
                displayMenu={displayMenu}
                currentUserFollowsAuthor={status.account.following}
                onFollowRequest={onFollowRequest}
                onUnfollowRequest={onUnfollowRequest}
                currentUserIsAuthor={currentUserIsAuthor}
            />
            <StatusBody
                text={status.content}
                mediaAttachments={status.media_attachments}
                referredStatus={status.referred_status}
                statusReferenceType={status.status_reference_type}
                hideThreadLink={hideThreadLink}
            />
            <StatusBottom
                onFavouriteClick={onFavouriteStatusChange}
                favourited={status.favourited}
                statusId={status.id}
                favouritesCount={status.favourite_count}
                statusLikePending={statusLikePending}
                btfsInfo={status.btfs_info}
                repostPending={repostPending}
                canBeReposted={status.can_be_reposted}
                currentUserIsAuthor={currentUserIsAuthor}
                status={status}
                currentUser={currentUser}
                setGenericAuthorizationDialogOpen={setGenericAuthorizationDialogOpen}
                setGenericAuthorizationDialogType={setGenericAuthorizationDialogType}
                isMeme={isMeme}
            />
        </Card>
    );

    if (link) {
        return (
            <Link
                style={{
                    textDecoration: "none",
                    color: "inherit"
                }}
                store={routerStore}
                view={Routes.status}
                params={{ id: status.id }}
            >
                {content}
            </Link>
        );
    }

    return content;
};

const mapMobxToProps = ({ store, authorization, genericAuthorizationDialog }) => ({
    routerStore: store,
    currentUser: authorization.currentUser,
    setGenericAuthorizationDialogOpen:
        genericAuthorizationDialog.setGenericAuthorizationDialogOpen,
    setGenericAuthorizationDialogType:
        genericAuthorizationDialog.setGenericAuthorizationDialogType
});

export const StatusListItem = inject(mapMobxToProps)(_StatusListItem);
