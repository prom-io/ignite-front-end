import Web3 from 'web3';
import { AuthorizationStore, LoginStore } from '../Authorization/stores';
import {
    StatusesListStore,
    CreateStatusStore,
    TimelinesSwitcherStore,
    UploadMediaAttachmentsStore,
    StatusPageStore,
    StatusBtfsInfoStore,
} from '../Status/stores';
import { UserProfileStore, UserFollowersStore, UserFollowingStore, UserCardStore, UpdateUserProfileStore, UploadUserAvatarStore } from '../User/stores';
import { SignUpStore } from '../SignUp/stores';
import { DrawerStore } from '../AppBar/stores';
import { LocaleStore } from '../localization/stores';
import { BtfsHashesStore } from '../Btfs/stores';

const authorization = new AuthorizationStore();
const login = new LoginStore(authorization);
const uploadMediaAttachments = new UploadMediaAttachmentsStore();
const createStatus = new CreateStatusStore(uploadMediaAttachments);
const globalTimeline = new StatusesListStore(authorization, createStatus, '/api/v1/timelines/global');
const userStatuses = new StatusesListStore(authorization, createStatus);
const userFollowers = new UserFollowersStore();
const userFollowing = new UserFollowingStore();
const userProfileTimeline = new StatusesListStore(authorization, createStatus);
const userProfile = new UserProfileStore(authorization, userProfileTimeline, userFollowers, userFollowing);
const signUp = new SignUpStore(authorization, new Web3());
const homeTimeline = new StatusesListStore(authorization, createStatus, '/api/v1/timelines/home');
const timelineSwitcher = new TimelinesSwitcherStore(globalTimeline, homeTimeline, authorization);
const userCard = new UserCardStore(authorization, userProfile);
const drawer = new DrawerStore();
const statusPage = new StatusPageStore(authorization, createStatus);
const localization = new LocaleStore();
const btfs = new BtfsHashesStore();
const statusBtfsInfo = new StatusBtfsInfoStore();
const statusComments = new StatusesListStore(authorization, createStatus, undefined, true);
const userAvatarUpload = new UploadUserAvatarStore();
const userProfileUpdate = new UpdateUserProfileStore(authorization, userAvatarUpload, userProfile);

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
    signUp,
    homeTimeline,
    timelineSwitcher,
    userCard,
    drawer,
    statusPage,
    uploadMediaAttachments,
    localization,
    btfs,
    statusBtfsInfo,
    statusComments,
    userAvatarUpload,
    userProfileUpdate,
};
