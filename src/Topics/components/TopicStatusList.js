import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles, Hidden } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import InfiniteScroll from "react-infinite-scroll-component";
import { FadeLoader } from "react-spinners";

import { MenuIcon } from "../../icons/MenuIcon";
import { StatusListItem } from "../../Status/components/StatusListItem";
import TopicsHashButton from "../../Topics/components/TopicsHashButton";

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
        display: "table"
    },
    hashBtnBlock: {
        display: "none",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "83px",
        padding: "0 0 0 15px",
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        [theme.breakpoints.down('sm')]: {
            display: "flex",
        },
    }
}));

const _TopicStatusList = ({
    currentUser,
    activeTab,
    statusesOnTopic,
    statusLikePendingMap,
    changeTabAndFetchStatuses,
    fetchAllStatuses,
    favouriteStatus,
    unfavouriteStatus,
    followStatusAuthor,
    setIsTopicsMenuOpen,
}) => {
    const classes = useStyles();
    const theme = useTheme();
    
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

            {/* ---------------тут будет скролл с кнопками -------*/}
                <div className={classes.hashBtnBlock}>
                    <TopicsHashButton>Long Tag #4</TopicsHashButton>
                    <TopicsHashButton>Long Tag #1</TopicsHashButton>
                    <TopicsHashButton>Long Tag #50</TopicsHashButton>
                    <TopicsHashButton>Long Tag #3</TopicsHashButton>
                </div>
            

            <InfiniteScroll
                next={fetchAllStatuses}
                loader={
                    <div className={classes.centered}>
                        <FadeLoader
                            css="transform: scale(0.5)"
                            color={theme.palette.primary.main}
                        />
                    </div>
                }
                dataLength={statusesOnTopic.length}
                style={{ overflowY: "hidden" }}
                hasMore={true}
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
                        // onUnfollowRequest={onUnfollowRequest}
                        displayMenu={Boolean(currentUser)}
                        currentUserIsAuthor={
                            currentUser && currentUser.id === status.account.id
                        }
                        statusLikePending={statusLikePendingMap[status.id]}
                        // repostPending={repostsPendingMap[status.id]}
                        link
                    />
                ))}
            </InfiniteScroll>
        </>
    );
};

const mapMobxToProps = ({ authorization, topicStatuses, topicsPopular }) => ({
    currentUser: authorization.currentUser,
    activeTab: topicStatuses.activeTab,
    statusesOnTopic: topicStatuses.statusesOnTopic,
    statusLikePendingMap: topicStatuses.statusLikePendingMap,
    changeTabAndFetchStatuses: topicStatuses.changeTabAndFetchStatuses,
    fetchStatusesOnTopic: topicStatuses.fetchStatusesOnTopic,
    fetchAllStatuses: topicStatuses.fetchAllStatuses,
    favouriteStatus: topicStatuses.favouriteStatus,
    unfavouriteStatus: topicStatuses.unfavouriteStatus,
    followStatusAuthor: topicStatuses.followStatusAuthor,
    setIsTopicsMenuOpen: topicsPopular.setIsTopicsMenuOpen,
});

export const TopicStatusList = inject(mapMobxToProps)(observer(_TopicStatusList));
