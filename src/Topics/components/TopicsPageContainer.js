import React from "react";
import { TopicStatusList } from "./TopicStatusList";
import { BackButton } from "../../components/BackButton";
import { useStore } from "../../store/hooks";

export const TopicsPageContainer = () => {
    const { fetchAllStatuses } = useStore().topicStatuses;

    return (
        <>
            <BackButton title="appbar.topics" toHome />
            <TopicStatusList fetchAction={fetchAllStatuses} />
        </>
    );
};
