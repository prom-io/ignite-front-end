import React from 'react';
import { Route } from 'mobx-router';
import {
    EthereumPlasmaPage,
    DistributedStoragePage,
    BinanceSmartChainPage,
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
    SignUpPage,
    SearchPeoplePage,
} from '../pages';
import { store } from '../store';
import { NotFound } from '../pages/NotFound';

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

            store.topicsPopular.fetchTopicsPopular(5);
            store.timelineSwitcher.selectedTimeline.fetchStatuses();
        },
        onExit: () => {
            store.timelineSwitcher.setSwitchOnUserChange(false);
            store.timelineSwitcher.selectedTimeline.reset();
            store.whoToFollow.reset();
            store.topicsPopular.reset();
        },
    }),
    notFound: new Route({
        path: '/404',
        component: <NotFound />,
    }),
    en: new Route({
        path: '/en',
        component: <SetEnglishLanguageAndRedirectToHomePage />,
    }),
    kr: new Route({
        path: '/kr',
        component: <SetKoreanLanguageAndRedirectToHomePage />,
    }),
    notifications: new Route({
        path: '/notifications',
        component: <NotificationsPage />,
        beforeEnter: () => {
            if (store.authorization.currentUser) {
                store.notifications.fetchNotifications();
            }
            store.userCard.setDisplayMode('currentUser');
        },
        onExit: () => {
            store.notifications.resetNotifications();
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
    searchPeople: new Route({
        path: '/search',
        component: <SearchPeoplePage />,
        beforeEnter: () => {
            store.userCard.setDisplayMode('currentUser');
        },
        onExit: () => {
            store.searchUsers.resetSearchPage();
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
    }),
    topic: new Route({
        path: '/topic/:title',
        component: <TopicPage />,
        beforeEnter: (route, params) => {
            store.topicsPopular.fetchTopicsPopular();
            store.topicStatuses.fetchTopicInfo(params.title);
            store.userCard.setDisplayMode('currentUser');
        },
        onParamsChange: (route, params) => {
            store.topicStatuses.resetStatuses();
            store.topicStatuses.fetchTopicInfo(params.title);
        },
        beforeExit: () => {
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
    ethereumPlasma: new Route({
        path: '/ethereum-plasma',
        component: <EthereumPlasmaPage />,
        beforeEnter: () => store.explorer.fetchEthereumPlasma(),
    }),
    distributedStorage: new Route({
        path: '/distributed-storage',
        component: <DistributedStoragePage />,
        beforeEnter: () => store.explorer.fetchDistributedStorage(),
    }),
    binanceSmartChain: new Route({
        path: '/binance-smart-chain',
        component: <BinanceSmartChainPage />,
        beforeEnter: () => store.explorer.fetchBinanceSmartChain(),
    }),
    signUp: new Route({
        path: '/sign-up',
        component: <SignUpPage />,
        beforeEnter: (route, params, routerStore, queryParams) => {
            if (queryParams.reference_id) {
                store.signUp.setReferenceId(queryParams.reference_id);
            }
        },
    }),
    userProfile: new Route({
        path: '/user/:username',
        component: <UserProfilePage />,
        beforeEnter: (route, params) => {
            if (!(store.userProfile.user && store.userProfile.username === params.username)) {
                store.userProfile.reset();
                store.userProfile.fetchUserByUsername(params.username);
            }
            store.userCard.setDisplayMode('userByAddress');
            store.userProfile.activeTab = 'posts';
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
            store.userProfileTimeline.removeStatusAuthorSubscriptionListener('userProfileAuthorSubscriptionListener');
            store.userProfileTimeline.removeStatusAuthorUnsubscriptionListener('userProfileAuthorUnsubscriptionListener');
        },
        onParamsChange: (route, params) => {
            store.userProfile.reset();
            store.userProfile.fetchUserByUsername(params.username);
        },
    }),
    userFollowers: new Route({
        path: '/user/:username/followers',
        component: <UserProfilePage />,
        beforeEnter: (route, params) => {
            if (!(store.userProfile.user && store.userProfile.username === params.username)) {
                store.userProfile.fetchUserByUsername(params.username);
            }

            store.userFollowers.fetchUserFollowers(params.username);
            store.userProfile.activeTab = 'followers';
        },
    }),
    userFollowing: new Route({
        path: '/user/:username/following',
        component: <UserProfilePage />,
        beforeEnter: (route, params) => {
            if (!(store.userProfile.user && store.userProfile.username === params.username)) {
                store.userProfile.fetchUserByUsername(params.username);
            }

            store.userFollowing.fetchFollowing(params.username);
            store.userProfile.activeTab = 'following';
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
