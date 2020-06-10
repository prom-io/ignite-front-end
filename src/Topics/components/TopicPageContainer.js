import React from "react";
import { observer } from "mobx-react";
import { Button, makeStyles } from "@material-ui/core";

import { BackButton } from "../../components/BackButton";
import { TopicStatusList } from "./TopicStatusList";
import { useStore, useLocalization } from "../../store/hooks";

const useStyles = makeStyles(() => ({
    topicTitle: {
        display: "flex",
        justifyContent: "space-between"
    },
    followTopicButton: {
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "18px",
        padding: "8px 34px",
        borderRadius: "30px"
    }
}));

export const TopicPageContainer = observer(() => {
    const classes = useStyles();
    const { l } = useLocalization();
    const topicStatuses = useStore().topicStatuses;
    const { currentTopicId, followTopic } = topicStatuses;

    return (
        <div>
            <div className={classes.topicTitle}>
                <BackButton params={currentTopicId} toTopics />
                <Button
                    className={classes.followTopicButton}
                    variant="contained"
                    color="primary"
                    onClick={followTopic}
                >
                    {l("user.profile.follow")}
                </Button>
            </div>
            <TopicStatusList />
        </div>
    );
});
