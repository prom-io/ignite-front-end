import { action, observable, reaction, computed } from "mobx";
import { throttle } from "lodash";
import { axiosInstance } from "../../api/axios-instance";

export class NotificationsStore {
    @observable
    notifications = [];

    @observable
    notificationsCount = 0;

    @observable
    pending = false;

    @observable
    error = undefined;

    @observable
    hasMore = true;

    authorization = undefined;

    @computed
    get currentUser() {
        return this.authorization.currentUser;
    }

    constructor(authorization) {
        this.authorization = authorization;

        this.fetchCountNotReadedNotifications = throttle(
            this.fetchCountNotReadedNotifications,
            5000
        );

        reaction(
            () => this.currentUser,
            currentUser => {
                this.reset();

                if (currentUser) {
                    this.fetchCountNotReadedNotifications();

                    if (window.location.pathname === "/notifications") {
                        this.fetchNotifications();
                    }
                }
            }
        );
    }

    @action
    addNotification = notification => {
        this.notifications = [notification, ...this.notifications];
    };

    @action
    fetchNotifications = () => {
        if (this.pending) {
            return;
        }

        this.pending = true;
        this.hasMore = true;

        let url;

        if (this.notifications.length !== 0) {
            const maxId = this.notifications[this.notifications.length - 1].id;
            url = `/api/v1/notifications?max_id=${maxId}`;
        } else {
            url = "/api/v1/notifications";
        }

        axiosInstance
            .get(url)
            .then(({ data }) => {
                if (data.length !== 0) {
                    this.notifications.push(...data);
                    this.readNotifications();
                } else {
                    this.hasMore = false;
                }
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    fetchCountNotReadedNotifications = () => {
        axiosInstance
            .get("/api/v1/notifications/not-read-count")
            .then(({ data }) => {
                this.notificationsCount = data.countOfNotRead;
            });
    };

    @action
    readNotifications = () => {
        const notReadedNotificationsId = this.notifications
            .filter(notification => notification.read === false)
            .map(notification => notification.id);

        if (notReadedNotificationsId.length > 0) {
            axiosInstance
                .put("/api/v1/notifications/read", {
                    notifications_ids: notReadedNotificationsId
                })
                .then(() => {
                    this.fetchCountNotReadedNotifications();
                });
        }
    };

    @action
    reset = () => {
        this.pending = false;
        this.notificationsCount = 0;
        this.notifications = [];
    };

    @action
    resetNotifications = () => {
        this.pending = false;
        this.notifications = [];
    };
}
