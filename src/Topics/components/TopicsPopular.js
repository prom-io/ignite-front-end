import React from "react";
import { observer } from "mobx-react";
import { Grid, Hidden, IconButton, makeStyles } from '@material-ui/core';

import { TopicsPopularList } from "./TopicsPopularList";
import { useLocalization, useStore } from '../../store/hooks';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(theme => ({
    topicsPopular: {
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: "4px"
    },
    topicsPopularHeader: {
        borderBottom: `1px solid ${theme.palette.border.main}`,

        "& h3": {
            padding: "16px",
            margin: "0",
            fontFamily: "Museo Sans Cyrl Bold",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.palette.text.main
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    },
}));

export const TopicsPopular = observer(() => {
    const classes = useStyles();
    const { l } = useLocalization();
    const { setIsTopicsMenuOpen } = useStore().topicsPopular;

    return (
        <Grid
            container
            spacing={2}
            className={"description-container-right"}>
            <Grid className="user_profile_container">
                <div className={classes.topicsPopular}>
                    <div className={classes.topicsPopularHeader}>
                        <Hidden only={["sm"]}>
                            <IconButton
                              onClick={() => setIsTopicsMenuOpen(false)}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        </Hidden>
                        <h3>{l("topics.card.popular")}</h3>
                    </div>
                    <div className={classes.topicsPopularBody}>
                        <TopicsPopularList />
                    </div>
                </div>
            </Grid>
        </Grid>
    );
});
