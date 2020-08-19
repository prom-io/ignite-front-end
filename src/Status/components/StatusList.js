import React, { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, Hidden, makeStyles } from "@material-ui/core";

import { StatusListItem } from "./StatusListItem";
import { WhoToFollow } from "../../Follow/components";
import Loader from "../../components/Loader";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "150px",
        display: "table"
    }
}));

export const StatusList = ({
    statuses,
    onFavouriteClick,
    statusLikePendingMap,
    repostsPendingMap,
    currentUser,
    displayMenu,
    onFollowRequest,
    onUnfollowRequest,
    onNextPageRequest,
    header,
    hideThreadLinks,
    hasMore
}) => {
    const classes = useStyles();

    return (
        <div id="statusList" className="status-list-card paddingBottomRoot">
            {header && statuses.length !== 0 && (
                <Typography variant="h6">{header}</Typography>
            )}
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
                        {currentUser && index === 5 && (
                            <Hidden lgUp>
                                <WhoToFollow isMobile />
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
                            repostPending={repostsPendingMap[status.id]}
                            link
                            hideThreadLink={hideThreadLinks}
                            isMeme={status.is_meme}
                        />
                    </Fragment>
                ))}
            </InfiniteScroll>
        </div>
    );
};
