import React from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

import { BackButton } from "../../components/BackButton";
import { useStore } from "../../store/hooks";

const useStyles = makeStyles(() => ({
    topicTitle: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

export const TopicPageContainer = observer(() => {
    const classes = useStyles();
    const topicStatuses = useStore().topicStatuses;
    const { currentTopicId } = topicStatuses;

    return (
        <div>
            <div className={classes.topicTitle}>
                <BackButton params={currentTopicId} toTopics />
            </div>
            <div>List</div>
        </div>
    );
});
