import React, {Fragment} from "react";
import {StatusHeader} from "./StatusHeader";
import {StatusBottom} from "./StatusBottom";
import {StatusBody} from "./StatusBody";

export const StatusListItem = ({status, onFavouriteStatusChange}) => (
    <Fragment>
        <StatusHeader username={status.account.username}
                      displayName={status.account.display_name}
                      avatar={status.account.avatar || "http://localhost:3000/avatars/original/missing.png"}
                      createdAt={status.created_at}
        />
        <StatusBody text={status.content}/>
        <StatusBottom onFavouriteClick={onFavouriteStatusChange}
                      favourited={status.favourited}
                      statusId={status.id}
                      favouritesCount={status.favourite_count}
        />
    </Fragment>
);
