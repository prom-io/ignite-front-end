import React from "react";
import {Route} from "mobx-router";
import {HomePage, UserProfilePage} from "../pages";
import {store} from "../store";

export const Routes = {
    home: new Route({
        path: "/",
        component: <HomePage/>,
        beforeEnter: () => store.globalTimeline.fetchStatuses()
    }),
    userProfile: new Route({
        path: "/:username",
        component: <UserProfilePage/>,
        beforeEnter: (route, params) => {
            store.userProfile.fetchUserByUsername(params.username);
        },
        onExit: () => {
            store.userProfile.reset();
        }
    })
};
