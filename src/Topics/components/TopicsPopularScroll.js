import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

import { TopicsHashButton } from "./TopicsHashButton";
import Loader from "../../components/Loader";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        display: "table",
    },
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
            marginTop: '50px'
        }
    }
}));

const _TopicsPopularScroll = ({ topicsPopularItems, pending, routerStore }) => {
    const classes = useStyles();

    return (
        <div className={classes.hashBtnBlock}>
            {pending ? (
                <div className={classes.centered}>
                    <Loader size="md" />
                </div>
            ) : (
                topicsPopularItems.map(topic => (
                    <TopicsHashButton
                        key={topic.id}
                        topic={topic}
                        routerStore={routerStore}
                    />
                ))
            )}
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
