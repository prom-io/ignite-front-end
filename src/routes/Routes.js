import React from 'react';
import { Route } from 'mobx-router';
import {
    BtfsHashesPage,
    ChatPage,
    DescriptionPage,
    HomePage,
    NotificationsPage,
    SetEnglishLanguageAndRedirectToHomePage,
    SetKoreanLanguageAndRedirectToHomePage,
    StatusPage,
    FollowPeoplePage,
    TermsAndPoliciesPage,
    TopicsPage,
    TopicPage,
    UserProfilePage,
    UserEditPage,
} from '../pages';
import { store } from '../store';

export const Routes = {
    home: new Route({
        path: '/',
        component: <HomePage />,
        beforeEnter: () => {
            store.userCard.setDisplayMode('currentUser');
            store.timelineSwitcher.setSwitchOnUserChange(true);

            if (store.authorization.currentUser && store.authorization.currentUser.follows_count !== 0) {
                store.timelineSwitcher.setCurrentTimeline('home');
            }

            store.timelineSwitcher.selectedTimeline.fetchStatuses();
        },
        onExit: () => {
            store.timelineSwitcher.setSwitchOnUserChange(false);
            store.timelineSwitcher.selectedTimeline.reset();
            store.whoToFollow.reset();
        },
    }),
    en: new Route({
        path: '/en',
        component: <SetEnglishLanguageAndRedirectToHomePage />,
    }),
    ko: new Route({
        path: '/ko',
        component: <SetKoreanLanguageAndRedirectToHomePage />,
    }),
    notifications: new Route({
        path: '/notifications',
        component: <NotificationsPage />,
        beforeEnter: () => {
            store.userCard.setDisplayMode('currentUser');
        },
        onExit: () => {
        },
    }),
    chat: new Route({
        path: '/chat',
        component: <ChatPage />,
        beforeEnter: () => {
            store.userCard.setDisplayMode('currentUser');
        },
        onExit: () => {
        },
    }),
    followPeople: new Route({
        path: '/follow-people',
        component: <FollowPeoplePage />,
        beforeEnter: () => {
            if (store.authorization.currentUser || !store.followPeople.followPeopleItems.length) {
                store.followPeople.fetchFollowPeople();
            }
            store.userCard.setDisplayMode('currentUser');
        },
        onExit: () => {
            store.followPeople.reset();
        },
    }),
    userEdit: new Route({
        path: '/edit-profile',
        component: <UserEditPage />,
        beforeEnter: () => {
            store.userCard.setDisplayMode('currentUser');
        },
        onExit: () => {
            store.userProfileUpdate.resetForm();
        },
    }),
    topics: new Route({
        path: '/topics',
        component: <TopicsPage />,
        beforeEnter: () => {
            store.topicsPopular.fetchTopicsPopular();
            store.topicStatuses.fetchAllStatuses();
            store.userCard.setDisplayMode('currentUser');
        },
        beforeExit: () => {
            store.topicStatuses.reset();
            store.topicsPopular.reset();
        },
        onExit: () => {
            // store.topicStatuses.reset();
            // store.topicsPopular.reset();
        },
    }),
    topic: new Route({
        path: '/topic/:id',
        component: <TopicPage />,
        beforeEnter: (route, params) => {
            store.topicsPopular.fetchTopicsPopular();
            store.topicStatuses.fetchStatusesOnTopic(params.id);
            store.userCard.setDisplayMode('currentUser');
        },
        onParamsChange: (route, params) => {
            store.topicStatuses.resetStatuses();
            store.topicStatuses.fetchStatusesOnTopic(params.id);
        },
        onExit: () => {
            store.topicsPopular.reset();
            store.topicStatuses.reset();
        },
    }),
    terms: new Route({
        path: '/terms-and-policy',
        component: <TermsAndPoliciesPage />,
        beforeEnter: () => {

        },
        onExit: () => {
        },
    }),
    description: new Route({
        path: '/description',
        component: <DescriptionPage />,
        beforeEnter: () => {

        },
        onExit: () => {
        },
    }),
    btfs: new Route({
        path: '/btfs',
        component: <BtfsHashesPage />,
        beforeEnter: () => store.btfs.fetchBtfsHashes(),
    }),
    userProfile: new Route({
        path: '/:username',
        component: <UserProfilePage />,
        beforeEnter: (route, params) => {
            store.userCard.setDisplayMode('userByAddress');
            store.userProfile.fetchUserByUsername(params.username);
            if (params.tab === 'followers') {
                store.userProfile.setActiveTab('followers');
                store.userFollowers.fetchUserFollowers(params.username);
            } else if (params.tab === 'following') {
                store.userProfile.setActiveTab('following');
                store.userFollowing.fetchFollowing(params.username);
            } else {
                store.userProfile.setActiveTab('posts');
                store.userProfileTimeline.fetchStatuses(params.username);
            }
            store.userProfileTimeline.addStatusAuthorSubscriptionListener({
                id: 'userProfileAuthorSubscriptionListener',
                subscribeToStatusAuthor: () => {
                    store.userProfile.setFollowedByCurrentUser(true);
                },
            });
            store.userProfileTimeline.addStatusAuthorUnsubscriptionListener({
                id: 'userProfileAuthorUnsubscriptionListener',
                unsubscribeFromStatusAuthor: () => {
                    store.userProfile.setFollowedByCurrentUser(false);
                },
            });
        },
        onExit: () => {
            store.userProfile.reset();
            store.userProfileTimeline.removeStatusAuthorSubscriptionListener('userProfileAuthorSubscriptionListener');
            store.userProfileTimeline.removeStatusAuthorUnsubscriptionListener('userProfileAuthorUnsubscriptionListener');
        },
        onParamsChange: (route, params) => {
            store.userProfile.reset();
            store.userProfile.fetchUserByUsername(params.username);
        },
    }),
    status: new Route({
        path: '/status/:id',
        component: <StatusPage />,
        beforeEnter: (route, params) => {
            store.statusPage.fetchStatus(params.id);
            store.statusComments.reset();
            store.statusComments.setOnlyAddCommentsToStatus(params.id);
            store.statusComments.setBaseUrl(`/api/v1/statuses/${params.id}/comments`);
            store.statusComments.fetchStatuses();
            store.userCard.setDisplayMode('currentUser');
        },
        onParamsChange: (route, params) => {
            store.statusPage.fetchStatus(params.id);
            store.statusComments.reset();
            store.statusComments.setOnlyAddCommentsToStatus(params.id);
            store.statusComments.setBaseUrl(`/api/v1/statuses/${params.id}/comments`);
            store.statusComments.fetchStatuses();
        },
        onExit: () => {
            store.statusPage.reset();
            store.statusComments.reset();
        },
    }),
};
