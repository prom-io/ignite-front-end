import React from "react";
import {inject} from "mobx-react";
import {Link} from "mobx-router";
import {Card} from "@material-ui/core";
import {StatusHeader} from "./StatusHeader";
import {StatusBottom} from "./StatusBottom";
import {StatusBody} from "./StatusBody";
import {Routes} from "../../routes";

const _StatusListItem = ({
    status,
    currentUserIsAuthor,
    onFavouriteStatusChange,
    displayMenu,
    onFollowRequest,
    onUnfollowRequest,
    statusLikePending,
    link = false,
    routerStore
}) => {
    const content = (
        <Card elevation={0}
              className="statusCardBox"
        >
            <StatusHeader username={status.account.username}
                          userId={status.account.id}
                          displayName={status.account.display_name}
                          avatar={status.account.avatar}
                          createdAt={status.created_at}
                          statusId={status.id}
                          displayMenu={displayMenu}
                          currentUserFollowsAuthor={status.account.following}
                          onFollowRequest={onFollowRequest}
                          onUnfollowRequest={onUnfollowRequest}
                          currentUserIsAuthor={currentUserIsAuthor}
            />
            <StatusBody text={status.content}
                        mediaAttachments={status.media_attachments}
            />
            <StatusBottom onFavouriteClick={onFavouriteStatusChange}
                          favourited={status.favourited}
                          statusId={status.id}
                          favouritesCount={status.favourite_count}
                          statusLikePending={statusLikePending}
            />
        </Card>
    );

    if (link) {
        return (
            <Link style={{
                textDecoration: "none",
                color: "inherit"
            }}
                  store={routerStore}
                  view={Routes.status}
                  params={{id: status.id}}
            >
                {content}
            </Link>
        )
    } else {
        return content;
    }
};

const mapMobxToProps = ({store}) => ({
    routerStore: store
});

export const StatusListItem = inject(mapMobxToProps)(_StatusListItem);
