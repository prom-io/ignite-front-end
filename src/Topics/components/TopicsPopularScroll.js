import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

import { TopicsHashButton } from "./TopicsHashButton";

const useStyles = makeStyles(theme => ({
    hashBtnBlock: {
        display: "none",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "83px",
        padding: "0 0 0 15px",
        whiteSpace: "nowrap",
        overflowX: "auto",
        [theme.breakpoints.down("sm")]: {
            display: "flex",
            marginTop: "50px"
        }
    }
}));

const _TopicsPopularScroll = ({ topicsPopularItems, pending, routerStore }) => {
    const classes = useStyles();

    return (
        <div className={classes.hashBtnBlock}>
            {!pending &&
                topicsPopularItems.length > 0 &&
                topicsPopularItems.map(topic => {
                    return topic.title === "memezator" ? undefined : (
                        <TopicsHashButton
                            key={topic.id}
                            topic={topic}
                            routerStore={routerStore}
                        />
                    );
                })}
        </div>
    );
};

const mapMobxToProps = ({ topicsPopular, store }) => ({
    topicsPopularItems: topicsPopular.topicsPopularItems,
    pending: topicsPopular.pending,
    routerStore: store
});

export const TopicsPopularScroll = inject(mapMobxToProps)(
    observer(_TopicsPopularScroll)
);
