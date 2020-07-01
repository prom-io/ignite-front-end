import React from "react";
import { observer, inject } from "mobx-react";
import { Button, makeStyles } from "@material-ui/core";

import { BackButton } from "../../components/BackButton";
import { TopicStatusList } from "./TopicStatusList";
import { localized } from "../../localization/components";
import { Routes } from "../../routes";

const useStyles = makeStyles(theme => ({
    topicTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            top: 0,
            width: '100%',
            zIndex: 1100,
            background: theme.palette.background.paper
        },
    },
    followTopicButton: {
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "0px",
        height: "34px",
        width: "114px",
        borderRadius: "30px",
        [theme.breakpoints.down("sm")]: {
            height: "28px",
            width: "90px",
            marginRight: "15px"
        }
    }
}));

const _TopicPageContainer = ({
    followTopic,
    fetchStatusesOnTopic,
    routerStore,
    l
}) => {
    const classes = useStyles();
    console.log(routerStore.router.params.title);
    
    return (
        <>
            <div className={classes.topicTitle}>
                <BackButton params={routerStore.router.params.title} toTopics />
                <Button
                    className={classes.followTopicButton}
                    variant="contained"
                    color="primary"
                    onClick={followTopic}
                >
                    {l("user.profile.follow")}
                </Button>
            </div>
            <TopicStatusList fetchAction={fetchStatusesOnTopic} />
        </>
    );
};

const mapMobxToProps = ({ topicStatuses, store }) => ({
    followTopic: topicStatuses.followTopic,
    fetchStatusesOnTopic: topicStatuses.fetchStatusesOnTopic,
    routerStore: store
});

export const TopicPageContainer = localized(
    inject(mapMobxToProps)(observer(_TopicPageContainer))
);
