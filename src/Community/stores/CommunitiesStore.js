import { observable, action } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class CommunitiesStore {
    @observable
    communities = [];

    @observable
    hasMore = true;

    @observable
    pending = false;

    @observable
    pendingJoin = false;

    @observable
    setStatusBtn = undefined;

    @observable
    selectedCommunity = undefined;

    @observable
    leaveDialogOpen = false;

    @action
    fetchCommunities = (type, reset) => {
        if (reset) {
            this.communities = [];
        }

        this.pending = true;

        if (type === "all") {
            setTimeout(() => {
                this.communities.push(...[
                    {
                        acct: "Ignite Official",
                        avatar: "https://sigma.ignite.so/api/v1/media/cce73fdb-a031-457d-aed5-d1511ac40691.png",
                        bio: "Blockchain based censorship-free social network",
                        created_at: "2020-05-12T15:37:34.913Z",
                        display_name: "Ignite Official",
                        external_url: null,
                        followers_count: 697,
                        following: false,
                        follows_count: 5,
                        id: "0x829EAa2c551c3f43681D3B7B2dad165e122C492266666",
                        statuses_count: 15,
                        username: "ignite_official"
                    },
                    {
                        acct: "Ignite Official",
                        avatar: "https://sigma.ignite.so/api/v1/media/cce73fdb-a031-457d-aed5-d1511ac40691.png",
                        bio: "Blockchain based censorship-free social network",
                        created_at: "2020-05-12T15:37:34.913Z",
                        display_name: "Ignite Official",
                        external_url: null,
                        followers_count: 697,
                        following: true,
                        follows_count: 5,
                        id: "0x829EAa2c551c3f43681D3B7B2dad165e122C49226667878",
                        statuses_count: 15,
                        username: "ignite_official"
                    }
                ]);
                this.pending = false;
            }, 1000);
        } else if (type === "my") {
            setTimeout(() => {
                this.communities.push(...[]);
                this.pending = false;
            }, 1000);
        }
    };

    @action
    doJoin = (community, setStatusBtn) => {
        if (!this.pendingJoin) {
            this.pendingJoin = true;
            this.setStatusBtn = setStatusBtn;
            if (community.following) {
                this.leaveDialogOpen = true;
                this.selectedCommunity = community.username;
                this.pendingJoin = false;
            } else {
                axiosInstance
                    .post(`/api/v1/community/${community.id}/join`)
                    .then(() => {
                        // this.authorizationStore.currentUser.community_count += 1;
                        community.following = true;
                        this.setStatusBtn("leave");
                    })
                    .finally(() => (this.pendingJoin = false));
            }
        }
    };

    @action
    leaveCommunity = () => {
        axiosInstance
            .post(`/api/v1/community/${this.selectedCommunity.id}/leave`)
            .then(() => {
                this.leaveDialogOpen = false;
                this.setStatusBtn("join");
                this.selectedCommunity.following = false;
                // this.authorizationStore.currentUser.community_count -= 1;
            })
            .finally(() => (this.setStatusBtn = undefined));
    };

    @action
    setLeaveDialogOpen = leaveDialogOpen => {
        this.leaveDialogOpen = leaveDialogOpen;
    };

    @action
    reset = () => {
        this.communities = [];
        this.hasMore = true;
    };
}
