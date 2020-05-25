import { action, observable, reaction, computed } from 'mobx';
import { throttle } from 'lodash';
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

        this.fetchNotifications = throttle(this.fetchNotifications, 5000);

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
    addNotification = notification => {
        this.notifications = [
            notification,
            ...this.notifications
        ];
    };

    @action
    fetchNotifications = () => {
        if (this.currentUser) {
            this.pending = true;

            let url;

            if (this.notifications.length !== 0) {
                const maxId = this.notifications[this.notifications.length - 1].id;
                url = `/api/v1/notifications?max_id=${maxId}`;
            } else {
                url = "/api/v1/notifications";
            }

            axiosInstance.get(url)
                .then(({data}) => this.notifications.push(...data))
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
