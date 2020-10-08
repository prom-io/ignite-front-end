import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Tabs, Tab, Hidden, makeStyles } from "@material-ui/core";

import { CreateStatusForm } from "../../Status/components";

const useStyles = makeStyles(() => ({
    communityTab: {
        fontSize: "15px",
        fontWeight: 600
    }
}));

const _CommunityContainer = ({
    currentUser,
    fetchCommunityPosts,
    fetchCommunityUsers,
    pending
}) => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState("posts");

    const handleChange = (event, newValue) => {
        setTabValue(newValue);
        newValue === "posts" ? fetchCommunityPosts() : fetchCommunityUsers();
    };

    return (
        <>
            {currentUser && (
                <Hidden smDown>
                    <CreateStatusForm />
                </Hidden>
            )}

            <Tabs
                value={tabValue}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
            >
                <Tab
                    classes={{ wrapper: classes.communityTab }}
                    label="Posts"
                    value="posts"
                    disabled={pending}
                    disableRipple
                />
                <Tab
                    classes={{ wrapper: classes.communityTab }}
                    label="Users"
                    value="users"
                    disabled={pending}
                    disableRipple
                />
            </Tabs>

            {tabValue === "posts" ? <div>Posts</div> : <div>Users</div>}
        </>
    );
};

const mapMobxToProps = ({ authorization, community }) => ({
    currentUser: authorization.currentUser,
    pending: community.pending,
    fetchCommunityPosts: community.fetchCommunityPosts,
    fetchCommunityUsers: community.fetchCommunityUsers
});

export const CommunityContainer = inject(mapMobxToProps)(
    observer(_CommunityContainer)
);
