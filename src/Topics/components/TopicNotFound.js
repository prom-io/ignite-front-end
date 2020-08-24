import React from "react";
import { observer } from "mobx-react";
import { Link } from "mobx-router";
import { Typography, makeStyles } from "@material-ui/core";

import { useLocalization, useRouter } from "../../store";
import { Routes } from "../../routes";
import { SadIconLarge } from "../../icons/SadIconLarge";

const useStyles = makeStyles(theme => ({
    link: {
        color: theme.palette.primary.main
    },
    emptyListContainer: {
        border: `1px solid ${theme.palette.border.main}`
    },
    emptyListContent: {
        display: "flex",
        padding: theme.spacing(2)
    },
    emptyListLabel: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(2)
    }
}));

export const TopicNotFound = observer(() => {
    const classes = useStyles();
    const { l } = useLocalization();
    const routerStore = useRouter();

    return (
        <div className={classes.emptyListContainer}>
            <div className={classes.emptyListContent}>
                <SadIconLarge />
                <div className={classes.emptyListLabel}>
                    <Typography>
                        <strong>{l("topic.not-found")}</strong>
                    </Typography>
                    <Typography>
                        {l("topic.see-all-topics")}{" "}
                        <Link
                            view={Routes.topics}
                            store={routerStore}
                            className={classes.link}
                        >
                            {l("topic.this-page")}
                        </Link>
                    </Typography>
                </div>
            </div>
        </div>
    );
});
