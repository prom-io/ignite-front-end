import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Tabs, Tab, Hidden, makeStyles } from "@material-ui/core";

import { CommunitiesSearchInput } from "./CommunitiesSearchInput";
import { CommunitiesList } from "./CommunitiesList";
import { CommunityLeaveDialog } from "./CommunityLeaveDialog";
import { BackButton } from "../../components/BackButton";

const useStyles = makeStyles(theme => ({
    communitiesTabs: {
        [theme.breakpoints.down("sm")]: {
            position: "fixed",
            width: "100%",
            top: 50,
            background: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.border.main}`,
            zIndex: 20
        }
    },
    communitiesTab: {
        fontSize: "15px",
        fontWeight: 600
    }
}));

const _CommunitiesContainer = ({ currentUser, fetchCommunities, pending }) => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState("all");

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
        fetchCommunities(newValue, true);
    };

    return (
        <>
            <Hidden smDown>
                <BackButton title="appbar.communities" toHome />
            </Hidden>

            <div className={classes.communitiesTabs}>
                <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                >
                    <Tab
                        classes={{ wrapper: classes.communitiesTab }}
                        label="All communities"
                        value="all"
                        disabled={pending}
                        disableRipple
                    />
                    <Tab
                        classes={{ wrapper: classes.communitiesTab }}
                        label="Your communities"
                        value="my"
                        disabled={pending || !currentUser}
                        disableRipple
                    />
                </Tabs>
            </div>

            {tabValue === "all" && <CommunitiesSearchInput />}

            <CommunitiesList type={tabValue} />

            <CommunityLeaveDialog />
        </>
    );
};

const mapMobxToProps = ({ authorization, communities }) => ({
    currentUser: authorization.currentUser,
    pending: communities.pending,
    fetchCommunities: communities.fetchCommunities
});

export const CommunitiesContainer = inject(mapMobxToProps)(
    observer(_CommunitiesContainer)
);
