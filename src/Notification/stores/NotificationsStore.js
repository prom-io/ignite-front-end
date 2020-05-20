import { action, observable, reaction, computed } from 'mobx';
import { axiosInstance } from '../../api/axios-instance';

export class NotificationsStore {
    @observable
    notifications = [];

    @observable
    pending = false;

    @observable
    error = undefined;

    authorization = undefined;

    @computed
    get currentUser() {
        return this.authorization.currentUser;
    }

    constructor(authorization) {
        this.authorization = authorization;

        reaction(
            () => this.currentUser,
            currentUser => {
                this.reset();

                if (currentUser) {
                    this.fetchNotifications();
                }
            }
        )
    }

    @action
    fetchNotifications = () => {
        if (this.currentUser) {
            this.pending = true;

            axiosInstance.get("/api/v1/notifications")
                .then(({data}) => this.notifications = [...this.notifications, ...data])
                .catch(error => this.error = error)
                .finally(() => this.pending = false)
        }
    };

    @action
    reset = () => {
        this.pending = false;
        this.notifications = [];
    }
}
