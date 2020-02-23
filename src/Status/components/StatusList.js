import React, {Fragment, useEffect} from "react";
import {Card, Divider} from "@material-ui/core";
import _ from "lodash";
import {StatusListItem} from "./StatusListItem";

export const StatusList = ({
    statuses,
    onFavouriteClick,
    pending,
    hasNewStatuses,
    onShowNewStatusesClick,
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
        <Card id="statusList">
            {statuses.map(status => (
                <Fragment key={status.id}>
                    <StatusListItem status={status}
                                    onFavouriteStatusChange={onFavouriteClick}
                    />
                    <Divider/>
                </Fragment>
            ))}
        </Card>
    );
}
