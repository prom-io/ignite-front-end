import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Tabs, Tab, Hidden, makeStyles } from "@material-ui/core";

import { CommunityLeaveDialog } from "./CommunityLeaveDialog";
import { CommunitiesList } from "./CommunitiesList";
import { BackButton } from "../../components/BackButton";

const useStyles = makeStyles(() => ({
    communitiesTab: {
        fontSize: "15px",
        fontWeight: 600
    }
}));

const _CommunitiesContainer = ({ fetchCommunities, pending }) => {
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
                    disabled={pending}
                    disableRipple
                />
            </Tabs>

            <CommunitiesList type={tabValue} />

            <CommunityLeaveDialog />
        </>
    );
};

const mapMobxToProps = ({ communities }) => ({
    pending: communities.pending,
    fetchCommunities: communities.fetchCommunities
});

export const CommunitiesContainer = inject(mapMobxToProps)(
    observer(_CommunitiesContainer)
);
