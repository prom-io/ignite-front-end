import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Tabs, Tab, Hidden, makeStyles } from "@material-ui/core";

import { CommunitiesList } from "./CommunitiesList";
import { BackButton } from "../../components/BackButton";

const useStyles = makeStyles(() => ({
    communitiesListHeader: {},
    communitiesTab: {
        fontSize: "15px",
        fontWeight: 600
    }
}));

const _CommunitiesContainer = ({ fetchCommunities }) => {
    const classes = useStyles();
    const [value, setValue] = useState("all");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Hidden smDown>
                <BackButton title="appbar.communities" toHome />
            </Hidden>

            <div className={classes.communitiesListHeader}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                >
                    <Tab
                        classes={{ wrapper: classes.communitiesTab }}
                        label="All communities"
                        value="all"
                    />
                    <Tab
                        classes={{ wrapper: classes.communitiesTab }}
                        label="Your communities"
                        value="my"
                    />
                </Tabs>
            </div>

            <CommunitiesList />
        </>
    );
};

const mapMobxToProps = ({ communities }) => ({
    // fetchCommunities: communities.fetchCommunities
});

export const CommunitiesContainer = inject(mapMobxToProps)(
    observer(_CommunitiesContainer)
);
