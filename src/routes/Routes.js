import React from "react";
import {Route} from "mobx-router";
import {
    ChatPage,
    DescriptionPage,
    HomePage,
    NotificationsPage,
    TermsAndPolicesPage,
    TrendsPage,
    UserProfilePage,
    StatusPage, BtfsHashesPage
} from "../pages";
import {store} from "../store";

export const Routes = {
    home: new Route({
        path: "/",
        component: <HomePage/>,
        beforeEnter: () => {
            store.userCard.setDisplayMode("currentUser");
            store.timelineSwitcher.setSwitchOnUserChange(true);

            if (store.authorization.currentUser && store.authorization.currentUser.follows_count !== 0) {
                store.timelineSwitcher.setCurrentTimeline("home");
            }

            store.timelineSwitcher.selectedTimeline.fetchStatuses();
            store.comments.addCommentCreationListener(statusId => store.timelineSwitcher.selectedTimeline.increaseCommentsCount(statusId));
        },
        onExit: () => {
            store.timelineSwitcher.setSwitchOnUserChange(false);
            store.timelineSwitcher.selectedTimeline.reset();
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
    }),
    terms: new Route({
        path: "/terms-and-policy",
        component: <TermsAndPolicesPage/>,
        beforeEnter: () => {

        },
        onExit: () => {
        }
    }),
    description: new Route({
        path: "/description",
        component: <DescriptionPage/>,
        beforeEnter: () => {

        },
        onExit: () => {
        }
    }),
    btfs: new Route({
        path: "/btfs",
        component: <BtfsHashesPage/>,
        beforeEnter: () => store.btfs.fetchBtfsHashes()
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
            });
            store.comments.addCommentCreationListener(statusId => store.userProfileTimeline.increaseCommentsCount(statusId));
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
    status: new Route({
        path: "/status/:id",
        component: <StatusPage/>,
        beforeEnter: (route, params) => {
            store.statusPage.fetchStatus(params.id);
            store.comments.addCommentCreationListener(statusId => store.statusPage.increaseCommentsCount(statusId))
        },
        onParamsChange: (route, params) => {
            store.statusPage.fetchStatus(params.id);
            store.comments.addCommentCreationListener(statusId => store.statusPage.increaseCommentsCount(statusId))
        },
        onExit: () => {
            store.statusPage.reset();
        }
    })
};
