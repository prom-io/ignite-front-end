import React, {Fragment} from "react";
import {Card} from "@material-ui/core";
import {StatusHeader} from "./StatusHeader";
import {StatusBottom} from "./StatusBottom";
import {StatusBody} from "./StatusBody";

export const StatusListItem = ({status, currentUserIsAuthor, onFavouriteStatusChange, displayMenu, onFollowRequest, onUnfollowRequest, statusLikePending}) => (
    <Card style={{
            border: "2px solid "
    }}
          elevation={0}
          className="statusCardBox"
    >
        <StatusHeader username={status.account.username}
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
        <StatusBody text={status.content}/>
        <StatusBottom onFavouriteClick={onFavouriteStatusChange}
                      favourited={status.favourited}
                      statusId={status.id}
                      favouritesCount={status.favourite_count}
                      statusLikePending={statusLikePending}
        />
    </Card>
);
