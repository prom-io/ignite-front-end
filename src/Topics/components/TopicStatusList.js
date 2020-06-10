import React from "react";
import { inject, observer } from "mobx-react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    topicListHeader: {
        display: "flex"
    },
    topicListHeaderItem: {
        cursor: "pointer",
        fontFamily: "Museo Sans Cyrl Regular",
        fontWeight: 600,
        fontSize: "15px",
        lineHeight: "18px",
        textAlign: "center",
        padding: "16px 31px",
        color: "#A2A2A2"
    },
    topicItemActive: {
        color: theme.palette.primary.main,
        borderBottom: "3px solid"
    }
}));

const _TopicStatusList = ({ activeTab, changeTabAndFetchStatuses }) => {
    const classes = useStyles();

    return (
        <div className={classes.topicList}>
            <div className={classes.topicListHeader}>
                <div
                    className={[
                        classes.topicListHeaderItem,
                        activeTab === "hot" ? classes.topicItemActive : ""
                    ].join(" ")}
                    onClick={() => changeTabAndFetchStatuses("hot")}
                >
                    Hot
                </div>
                <div
                    className={[
                        classes.topicListHeaderItem,
                        activeTab === "fresh" ? classes.topicItemActive : ""
                    ].join(" ")}
                    onClick={() => changeTabAndFetchStatuses("fresh")}
                >
                    Fresh
                </div>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ topicStatuses }) => ({
    activeTab: topicStatuses.activeTab,
    changeTabAndFetchStatuses: topicStatuses.changeTabAndFetchStatuses
});

export const TopicStatusList = inject(mapMobxToProps)(observer(_TopicStatusList));
