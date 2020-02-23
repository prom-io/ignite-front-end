import React from "react";
import {Route} from "mobx-router";
import {HomePage, UserProfilePage} from "../pages";
import {store} from "../store";

export const Routes = {
    home: new Route({
        path: "/",
        component: <HomePage/>,
        beforeEnter: () => {
            store.timelineSwitcher.setSwitchOnUserChange(true);
            store.timelineSwitcher.selectedTimeline.reset();
            store.timelineSwitcher.selectedTimeline.fetchStatuses();
        },
        onExit: () => {
            store.timelineSwitcher.setSwitchOnUserChange(false);
            store.timelineSwitcher.selectedTimeline.reset();
        }
    }),
    userProfile: new Route({
        path: "/:username",
        component: <UserProfilePage/>,
        beforeEnter: (route, params) => {
            store.userProfile.fetchUserByUsername(params.username);
        },
        onExit: () => {
            store.userProfile.reset();
        },
        onParamsChange: (route, params) => {
            store.userProfile.reset();
            store.userProfile.fetchUserByUsername(params.username);
        }
    })
};
