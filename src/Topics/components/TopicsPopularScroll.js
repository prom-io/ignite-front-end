import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import { FadeLoader } from "react-spinners";

import { TopicsHashButton } from "./TopicsHashButton";

const useStyles = makeStyles(theme => ({
    centered: {
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        display: "table"
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
            display: "flex"
        }
    }
}));

const _TopicsPopularScroll = ({ topicsPopularItems, pending, routerStore }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.hashBtnBlock}>
            {pending ? (
                <div className={classes.centered}>
                    <FadeLoader
                        color={theme.palette.primary.main}
                        css="transform: scale(0.5); top: 10px; left: 10px"
                    />
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
