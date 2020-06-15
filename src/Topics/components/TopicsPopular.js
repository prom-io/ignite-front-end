import React  from 'react';
import { observer } from "mobx-react";
import { Grid, makeStyles } from "@material-ui/core";

import { TopicsPopularList } from "./TopicsPopularList";
import { useLocalization } from "../../store/hooks";

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
        }
    },
    topicsPopularBody: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }
}));

export const TopicsPopular = observer(({isTopicsMenuOpen}) => {
    const classes = useStyles();
    const { l } = useLocalization();

    return (
        <Grid container spacing={2} className={`description-container-right ${isTopicsMenuOpen && classes.topicsPopularBody}`}>
            <Grid className="user_profile_container">
                <div className={classes.topicsPopular}>
                    <div className={classes.topicsPopularHeader}>
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
