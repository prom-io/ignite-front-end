import React from "react";
import {Card, Typography} from "@material-ui/core";
import {StatusHeader} from "./StatusHeader";
import {StatusBottom} from "./StatusBottom";
import {StatusBody} from "./StatusBody";
import {StatusMediaAttachments} from "./StatusMediaAttachments";

export const StatusListItem = ({status, currentUserIsAuthor, onFavouriteStatusChange, displayMenu, onFollowRequest, onUnfollowRequest, statusLikePending}) => (
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
