import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

import { MenuIcon } from "../../icons/MenuIcon";
import { UnfollowDialog } from "../../Follow/components";
import { StatusListItem } from "../../Status/components/StatusListItem";
import { TopicsPopularScroll } from "./TopicsPopularScroll";
import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
    topicListHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "-2px",
        [theme.breakpoints.down("sm")]: {
            position: "fixed",
            width: "100%",
            top: 50,
            background: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.border.main}`,
            zIndex: 20
        }
    },
    topicListHeaderSwitcher: {
        display: "flex"
    },
    topicListHeaderMenu: {
        display: "none",
        marginRight: "15px",
        [theme.breakpoints.down("sm")]: {
            display: "block"
        }
    },
    topicListHeaderItem: {
        cursor: "pointer",
        fontFamily: "Museo Sans Cyrl Regular",
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "18px",
        textAlign: "center",
        padding: "16px 31px",
        color: "#A2A2A2"
    },
    topicItemActive: {
        color: theme.palette.primary.main,
        borderBottom: "3px solid"
    },
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        display: "table",
        marginTop: '100px',
    }
}));

const _TopicStatusList = ({
    fetchAction,
    currentUser,
    activeTab,
    pending,
    hasMore,
    statusesOnTopic,
    statusLikePendingMap,
    repostsPendingMap,
    changeTabAndFetchStatuses,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    setIsTopicsMenuOpen,
    unfollowStatusAuthorWithDialog,
    currentStatusUsername,
    unfollowStatusAuthor,
    setUnfollowDialogOpen,
    unfollowDialogOpen
}) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.topicListHeader}>
                <div className={classes.topicListHeaderSwitcher}>
                    <div
                        className={[
                            classes.topicListHeaderItem,
                            activeTab === "hot" ? classes.topicItemActive : ""
                        ].join(" ")}
                        onClick={() => changeTabAndFetchStatuses("hot")}
                    >
                        Hot
                    </div>
                    <div
                        className={[
                            classes.topicListHeaderItem,
                            activeTab === "fresh" ? classes.topicItemActive : ""
                        ].join(" ")}
                        onClick={() => changeTabAndFetchStatuses("fresh")}
                    >
                        Fresh
                    </div>
                </div>
                <div
                    className={classes.topicListHeaderMenu}
                    onClick={() => setIsTopicsMenuOpen(true)}
                >
                    <MenuIcon />
                </div>
            </div>

            <TopicsPopularScroll />

            {pending && statusesOnTopic.length === 0 ? (
                <div className={classes.centered}>
                    <Loader size="lg" />
                </div>
            ) : (
                <InfiniteScroll
                    next={fetchAction}
                    loader={
                        <div className={classes.centered}>
                            <Loader size="lg" />
                        </div>
                    }
                    dataLength={statusesOnTopic.length}
                    style={{ overflowY: "hidden" }}
                    hasMore={hasMore}
                >
                    {statusesOnTopic.map(status => (
                        <StatusListItem
                            key={status.id}
                            status={status}
                            onFavouriteStatusChange={(statusId, favourited) =>
                                favourited
                                    ? favouriteStatus(statusId)
                                    : unfavouriteStatus(statusId)
                            }
                            onFollowRequest={followStatusAuthor}
                            onUnfollowRequest={unfollowStatusAuthorWithDialog}
                            displayMenu={Boolean(currentUser)}
                            currentUserIsAuthor={
                                currentUser && currentUser.id === status.account.id
                            }
                            statusLikePending={statusLikePendingMap[status.id]}
                            repostPending={repostsPendingMap[status.id]}
                            link
                        />
                    ))}
                </InfiniteScroll>
            )}

            <UnfollowDialog
                username={currentStatusUsername}
                unfollowAction={unfollowStatusAuthor}
                unfollowDialogOpen={unfollowDialogOpen}
                setUnfollowDialogOpen={setUnfollowDialogOpen}
            />
        </>
    );
};

const mapMobxToProps = ({
    authorization,
    topicStatuses,
    topicsPopular,
    createStatus
}) => ({
    currentUser: authorization.currentUser,
    activeTab: topicStatuses.activeTab,
    pending: topicStatuses.pending,
    hasMore: topicStatuses.hasMore,
    statusesOnTopic: topicStatuses.statusesOnTopic,
    statusLikePendingMap: topicStatuses.statusLikePendingMap,
    repostsPendingMap: createStatus.pendingRepostsMap,
    changeTabAndFetchStatuses: topicStatuses.changeTabAndFetchStatuses,
    favouriteStatus: topicStatuses.favouriteStatus,
    unfavouriteStatus: topicStatuses.unfavouriteStatus,
    followStatusAuthor: topicStatuses.followStatusAuthor,
    setIsTopicsMenuOpen: topicsPopular.setIsTopicsMenuOpen,
    unfollowStatusAuthorWithDialog: topicStatuses.unfollowStatusAuthorWithDialog,
    currentStatusUsername: topicStatuses.currentStatusUsername,
    unfollowStatusAuthor: topicStatuses.unfollowStatusAuthor,
    setUnfollowDialogOpen: topicStatuses.setUnfollowDialogOpen,
    unfollowDialogOpen: topicStatuses.unfollowDialogOpen
});

export const TopicStatusList = inject(mapMobxToProps)(observer(_TopicStatusList));
