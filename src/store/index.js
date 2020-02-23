import Web3 from "web3";
import {AuthorizationStore, LoginStore} from "../Authorization/stores";
import {StatusesListStore, CreateStatusStore} from "../Status/stores";
import {UserProfileStore, UserFollowersStore, UserFollowingStore} from "../User/stores";
import {SignUpStore} from "../SignUp/stores";

const authorization = new AuthorizationStore();
const login = new LoginStore(authorization);
const createStatus = new CreateStatusStore();
const globalTimeline = new StatusesListStore(authorization, createStatus,"/api/v1/timelines/global");
const userStatuses = new StatusesListStore(authorization, createStatus);
const userFollowers = new UserFollowersStore();
const userFollowing = new UserFollowingStore();
const userProfileTimeline = new StatusesListStore(authorization, createStatus);
const userProfile = new UserProfileStore(authorization, userProfileTimeline, userFollowers, userFollowing);
const signUp = new SignUpStore(authorization, new Web3());

export const store = {
    authorization,
    login,
    globalTimeline,
    userStatuses,
    userFollowers,
    userFollowing,
    userProfile,
    createStatus,
    userProfileTimeline,
    signUp
};
