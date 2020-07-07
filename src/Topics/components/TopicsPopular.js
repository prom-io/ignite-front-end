import React from "react";
import { observer } from "mobx-react";
import { Link } from 'mobx-router';
import { Grid, Hidden, IconButton, makeStyles } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { TopicsPopularList } from "./TopicsPopularList";
import { useLocalization, useRouter, useStore } from '../../store/hooks';
import { Routes } from '../../routes';

const useStyles = makeStyles(theme => ({
    topicsPopular: {
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: "4px"
    },
    topicsPopularIsNotFull: {
        marginBottom: "16px"
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
    topicsPopularFooter: {
        padding: '16px',
        margin: '0',
        borderTop: `1px solid ${theme.palette.border.main}`,

        '& a': {
            fontFamily: 'Museo Sans Cyrl Regular',
            fontStyle: 'normal',
            fontWeight: 300,
            fontSize: '15px',
            color: theme.palette.primary.main,

            '&:hover': {
                textDecoration: 'none',
            },
        },
    },
}));

export const TopicsPopular = observer(({ isNotFull }) => {
    const classes = useStyles();
    const { l } = useLocalization();
    const routerStore = useRouter();
    const { setIsTopicsMenuOpen } = useStore().topicsPopular;

    return (
        <Grid
            container
            spacing={2}
            className={"description-container-right"}>
            <Grid className="user_profile_container">
                <div className={[
                        classes.topicsPopular, 
                        isNotFull && classes.topicsPopularIsNotFull
                    ].join(" ")}
                >
                    <div className={classes.topicsPopularHeader}>
                        <Hidden lgUp>
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
                    {isNotFull && (
                        <div className={classes.topicsPopularFooter}>
                            <Link view={Routes.topics} store={routerStore}>
                                {l('user.card.show-more')}
                            </Link>
                        </div>
                    )}
                </div>
            </Grid>
        </Grid>
    );
});
