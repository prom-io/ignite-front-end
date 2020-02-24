import React from "react";
import {Route} from "mobx-router";
import {HomePage, UserProfilePage, NotificationsPage, ChatPage, TrendsPage} from "../pages";
import {store} from "../store";

export const Routes = {
    home: new Route({
        path: "/",
        component: <HomePage/>,
        beforeEnter: () => {
            store.userCard.setDisplayMode("currentUser");
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
            store.userCard.setDisplayMode("userByAddress");
            store.userProfile.fetchUserByUsername(params.username);
            store.userProfileTimeline.addStatusAuthorSubscriptionListener({
                id: "userProfileAuthorSubscriptionListener",
                subscribeToStatusAuthor: () => {
                    store.userProfile.setFollowedByCurrentUser(true);
                }
            });
            store.userProfileTimeline.addStatusAuthorUnsubscriptionListener({
                id: "userProfileAuthorUnsubscriptionListener",
                unsubscribeFromStatusAuthor: () => {
                    store.userProfile.setFollowedByCurrentUser(false);
                }
            })
        },
        onExit: () => {
            store.userProfile.reset();
            store.userProfileTimeline.removeStatusAuthorSubscriptionListener("userProfileAuthorSubscriptionListener");
            store.userProfileTimeline.removeStatusAuthorUnsubscriptionListener("userProfileAuthorUnsubscriptionListener");
        },
        onParamsChange: (route, params) => {
            store.userProfile.reset();
            store.userProfile.fetchUserByUsername(params.username);
        }
    }),
    notifications: new Route({
        path: "/notifications",
        component: <NotificationsPage/>,
        beforeEnter: () => {

        },
        onExit: () => {
        }
    }),
    chat: new Route({
        path: "/chat",
        component: <ChatPage/>,
        beforeEnter: () => {

        },
        onExit: () => {
        }
    }),
    trends: new Route({
        path: "/trends",
        component: <TrendsPage/>,
        beforeEnter: () => {

        },
        onExit: () => {
        }
    })
};
