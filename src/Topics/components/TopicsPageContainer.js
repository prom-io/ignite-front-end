import React from "react";
import { TopicStatusList } from "./TopicStatusList";
import { BackButton } from "../../components/BackButton";
import { useStore } from "../../store/hooks";
import { Hidden } from '@material-ui/core';

export const TopicsPageContainer = () => {
    const { fetchAllStatuses } = useStore().topicStatuses;

    return (
        <>
          <Hidden smDown>
            <BackButton title="appbar.topics" toHome />
          </Hidden>
            <TopicStatusList fetchAction={fetchAllStatuses} />
        </>
    );
};
