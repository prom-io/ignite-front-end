import React from "react";
import { Hidden } from "@material-ui/core";

import { TopicStatusList } from "./TopicStatusList";
import { BackButton } from "../../components/BackButton";
import { useStore } from "../../store/hooks";

export const TopicsPageContainer = ({ currentUser }) => {
    const { fetchAllStatuses } = useStore().topicStatuses;

    if (!currentUser) {
        return <TopicStatusList fetchAction={fetchAllStatuses} />;
    }

    return (
        <>
            <Hidden smDown>
                <BackButton title="appbar.topics" toHome />
            </Hidden>
            <TopicStatusList fetchAction={fetchAllStatuses} />
        </>
    );
};
