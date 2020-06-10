import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/core/SvgIcon/SvgIcon";

const useStyles = makeStyles(theme => ({
    topicItemBody: {
        display: "flex",
        flexDirection: "column",
        padding: "12px 16px",
        borderTop: `1px solid ${theme.palette.border.main}`,
        fontSize: "15px",
        fontFamily: "Museo Sans Cyrl Regular",
        color: theme.palette.text.main
    },
    topicItemHeader: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",

        "& h6": {
            margin: 0,
            fontWeight: 600,
            fontSize: "15px",
            lineHeight: "18px",
        }
    },
    topicItemFooter: {
        color: theme.palette.text.secondary
    }
}));

export const TopicItem = ({ topic }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.topicItemBody}>
            <div className={classes.topicItemHeader}>
                <h6>#{topic.title}</h6>
                <ArrowDropDownIcon
                    style={{ color: theme.palette.text.secondary }}
                    classes={{
                        root: open && classes.arrowAnimate
                    }}
                />
            </div>
            <div className={classes.topicItemFooter}>{topic.posts_count} posts</div>
        </div>
    );
};
