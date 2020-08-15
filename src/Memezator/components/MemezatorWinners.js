import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import { MemezatorWinnersList } from "./";
import { localized } from "../../localization/components";

const useStyles = makeStyles(theme => ({
    memezatorWinners: {
        border: `1px solid ${theme.palette.border.main}`,
        borderRadius: "4px"
    },
    memezatorWinnersMobileWrapper: {
        background: theme.palette.border.main
    },
    memezatorWinnersMobile: {
        margin: "8px 0",
        padding: "0px",
        height: "unset",
        maxWidth: "unset",
        width: "100%",

        "& > div": {
            background: theme.palette.background.paper,
            borderRadius: "0px"
        }
    },
    memezatorWinnersHeader: {
        borderBottom: `1px solid ${theme.palette.border.main}`,

        "& h5": {
            padding: "16px",
            margin: 0,
            fontWeight: 700,
            fontSize: "20px",
            lineHeight: "24px",
            color: theme.palette.text.main
        }
    },
    memezatorWinnersFooter: {
        padding: "16px",
        margin: "0",

        "& p": {
            display: "inline-block",
            cursor: "pointer",
            textDecoration: "underline",
            fontWeight: 300,
            fontSize: "15px",

            "&:hover": {
                textDecoration: "none"
            }
        }
    }
}));

const _MemezatorWinners = ({ isMobile, recentWinners, pending, l }) => {
    const classes = useStyles();
    const [hideShowMore, setHideShowMore] = useState(isMobile);
    const [viewCount, setViewCount] = useState(isMobile ? 3 : 4);

    const handleCLickShowMore = () => {
        setViewCount(8);
        setHideShowMore(true);
    };

    return (
        <Grid
            container
            spacing={2}
            className={`description-container-right ${
                isMobile ? classes.memezatorWinnersMobileWrapper : ""
            }`}
        >
            <Grid
                className={`user_profile_container ${
                    isMobile ? classes.memezatorWinnersMobile : ""
                }`}
            >
                <div className={classes.memezatorWinners}>
                    <div className={classes.memezatorWinnersHeader}>
                        <Typography variant="h5">
                            {l("memezator.card.recent-winners")}
                        </Typography>
                    </div>
                    <MemezatorWinnersList
                        pending={pending}
                        recentWinners={recentWinners.slice(0, viewCount)}
                    />
                    {!hideShowMore && (
                        <div className={classes.memezatorWinnersFooter}>
                            <Typography
                                color="primary"
                                onClick={handleCLickShowMore}
                            >
                                {l("user.card.show-more")}
                            </Typography>
                        </div>
                    )}
                </div>
            </Grid>
        </Grid>
    );
};

const mapMobxToProps = ({ memezatorWinners }) => ({
    recentWinners: memezatorWinners.recentWinners,
    pending: memezatorWinners.pending
});

export const MemezatorWinners = localized(
    inject(mapMobxToProps)(observer(_MemezatorWinners))
);
