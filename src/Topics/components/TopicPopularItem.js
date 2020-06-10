import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { Routes } from "../../routes";
import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    topicItemBody: {
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        padding: "12px 16px",
        borderBottom: `1px solid ${theme.palette.border.main}`,
        fontSize: "15px",
        fontFamily: "Museo Sans Cyrl Regular",
        color: theme.palette.text.main,

        "&:hover": {
            background: theme.palette.background.light
        },

        "&:last-child": {
            borderBottom: 0
        }
    },
    topicItemHeader: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",

        "& h6": {
            margin: 0,
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px"
        }
    },
    topicItemFooter: {
        color: theme.palette.text.secondary
    },
    arrowAnimate: {
        transform: "rotate(180deg)"
    }
}));

const _TopicPopularItem = ({ topic, routerStore, l }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Link
            className={classes.topicItemBody}
            view={Routes.topic}
            params={{ id: topic.id }}
            store={routerStore}
        >
            <div className={classes.topicItemHeader}>
                <h6>#{topic.title}</h6>
                <ArrowDropDownIcon
                    style={{ color: theme.palette.text.secondary }}
                    // classes={{
                    //     root:
                    //         routerStore.router.params.id === topic.id &&
                    //         classes.arrowAnimate
                    // }}
                />
            </div>
            <div className={classes.topicItemFooter}>
                {topic.posts_count} {l("topics.card.posts")}
            </div>
        </Link>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store
});

export const TopicPopularItem = localized(
    inject(mapMobxToProps)(observer(_TopicPopularItem))
);
