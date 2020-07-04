import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "mobx-router";
import { makeStyles } from '@material-ui/core';

import { ClickEventPropagationStopper } from '../../ClickEventProgatationStopper';
import { Routes } from "../../routes";
import { localized } from "../../localization/components";
import { TopicPopularItemMenu } from "./TopicPopularItemMenu";
import { useStore } from '../../store/hooks';

const useStyles = makeStyles(theme => ({
    topicItemBody: {
        position: "relative",
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
        marginBottom: "4px",

        "& h6": {
            margin: 0,
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px"
        }
    },
    topicItemFooter: {
        color: theme.palette.text.secondary
    }
}));

const _TopicPopularItem = ({ topic, routerStore, l }) => {
    const { setIsTopicsMenuOpen } = useStore().topicsPopular;
    const classes = useStyles();

    return (
        <Link
            className={classes.topicItemBody}
            view={Routes.topic}
            params={{ title: topic.title }}
            store={routerStore}
        >
            <div className={classes.topicItemHeader} onClick={()=>setIsTopicsMenuOpen(false)}>
                <h6>#{topic.title}</h6>
                <ClickEventPropagationStopper>
                    <TopicPopularItemMenu topicId={topic.id} />
                </ClickEventPropagationStopper>
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
