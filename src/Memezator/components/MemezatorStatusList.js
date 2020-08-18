import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Hidden, makeStyles } from "@material-ui/core";

import { MemezatorWinners } from "./";
import { StatusListItem } from "../../Status/components";
import Loader from "../../components/Loader";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    }
}));

export const MemezatorStatusList = ({
    statuses,
    onFavouriteClick,
    statusLikePendingMap,
    currentUser,
    displayMenu,
    onFollowRequest,
    onUnfollowRequest,
    onNextPageRequest,
    hasMore
}) => {
    const classes = useStyles();

    return (
        <div id="statusList" className="status-list-card paddingBottomRoot">
            
            <InfiniteScroll
                next={onNextPageRequest}
                hasMore={hasMore}
                loader={
                    <div className={classes.centered}>
                        <Loader size="lg" />
                    </div>
                }
                dataLength={statuses.length}
                style={{ overflowY: "hidden" }}
            >
                {statuses.map((status, index) => (
                    <Fragment key={status.id}>
                        {index === 5 && (
                            <Hidden lgUp>
                                <MemezatorWinners isMobile />
                            </Hidden>
                        )}
                        <StatusListItem
                            status={status}
                            onFavouriteStatusChange={onFavouriteClick}
                            onFollowRequest={onFollowRequest}
                            onUnfollowRequest={onUnfollowRequest}
                            displayMenu={displayMenu}
                            currentUserIsAuthor={
                                currentUser && currentUser.id === status.account.id
                            }
                            statusLikePending={statusLikePendingMap[status.id]}
                            link
                            isMeme
                        />
                    </Fragment>
                ))}
            </InfiniteScroll>
        </div>
    );
};
