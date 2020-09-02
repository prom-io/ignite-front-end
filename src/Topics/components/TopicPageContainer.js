import React from "react";
import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/core";

import { BackButton } from "../../components/BackButton";
import { TopicFollowButton } from "./TopicFollowButton";
import { TopicStatusList } from "./TopicStatusList";

const useStyles = makeStyles(theme => ({
    topicTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1100,
            background: theme.palette.background.paper
        }
    }
}));

const _TopicPageContainer = ({
    fetchStatusesOnTopic,
    error,
    routerStore,
    currentUser
}) => {
    const classes = useStyles();

    if (!currentUser) {
        return <TopicStatusList fetchAction={fetchStatusesOnTopic} error={error} />;
    }

    return (
        <>
            <div className={classes.topicTitle}>
                <BackButton params={routerStore.router.params.title} toTopics />
                {!error && <TopicFollowButton />}
            </div>
            <TopicStatusList fetchAction={fetchStatusesOnTopic} error={error} />
        </>
    );
};

const mapMobxToProps = ({ topicStatuses, store }) => ({
    fetchStatusesOnTopic: topicStatuses.fetchStatusesOnTopic,
    error: topicStatuses.error,
    routerStore: store
});

export const TopicPageContainer = inject(mapMobxToProps)(
    observer(_TopicPageContainer)
);
