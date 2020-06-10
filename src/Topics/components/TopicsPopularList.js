import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import { FadeLoader } from "react-spinners";

import { TopicItem } from "./TopicItem";

const useStyles = makeStyles(() => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        display: "table"
    }
}));

const _TopicsPopularList = ({ fetchTopicsPopular, topicsPopularItems, pending }) => {
    const classes = useStyles();
    const theme = useTheme();

    useEffect(() => {
        fetchTopicsPopular();
    }, []);

    return topicsPopularItems.length === 0 && pending ? (
        <div className={classes.centered}>
            <FadeLoader
                color={theme.palette.primary.main}
                css="transform: scale(0.5); top: 10px; left: 10px"
            />
        </div>
    ) : (
        topicsPopularItems.map(topic => <TopicItem key={topic.id} topic={topic} />)
    );
};

const mapMobxToProps = ({ topics }) => ({
    fetchTopicsPopular: topics.fetchTopicsPopular,
    topicsPopularItems: topics.topicsPopularItems,
    pending: topics.pending
});

export const TopicsPopularList = inject(mapMobxToProps)(
    observer(_TopicsPopularList)
);
