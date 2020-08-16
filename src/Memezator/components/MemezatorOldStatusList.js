import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Typography, makeStyles } from "@material-ui/core";

import { StatusListItem } from "../../Status/components";
import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table"
    },
    oldPostsTitleWrapper: {
        background: theme.palette.background.light,
        padding: "16px",
        border: `1px solid ${theme.palette.border.main}`,
        borderTop: 0,
        borderBottom: 0
    },
    oldPostsTitle: {
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: "24px"
    }
}));

export const MemezatorOldStatusList = ({
    statuses,
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
            <div className={classes.oldPostsTitleWrapper}>
                <Typography classes={{ root: classes.oldPostsTitle }} variant="h6">
                    Old posts
                </Typography>
            </div>
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
                {statuses.map(status => (
                    <StatusListItem
                        key={status.id}
                        status={status}
                        onFollowRequest={onFollowRequest}
                        onUnfollowRequest={onUnfollowRequest}
                        displayMenu={displayMenu}
                        currentUserIsAuthor={
                            currentUser && currentUser.id === status.account.id
                        }
                        link
                        isMeme
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};
