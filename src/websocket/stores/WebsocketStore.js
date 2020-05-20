import { action, computed, reaction } from 'mobx';
import SocketIo from 'socket.io-client';

export class WebsocketStore {
    authorizationStore = undefined;
    notificationsStore = undefined;
    socketIoClient = undefined;

    @computed
    get currentUser() {
        return this.authorizationStore.currentUser;
    }

    constructor(authorizationStore, notificationsStore) {
        this.authorizationStore = authorizationStore;
        this.notificationsStore = notificationsStore;

        reaction(
            () => this.currentUser,
            () => this.reconnectToWebsocket()
        );
    }

    @action
    reconnectToWebsocket = () => {
        if (this.socketIoClient) {
            this.socketIoClient.disconnect();
        }

        if (localStorage.getItem("accessToken")) {
            this.socketIoClient = SocketIo.connect(`${process.env.REACT_APP_API_BASE_URL}?access_token=${localStorage.getItem("accessToken")}`, {
                path: "/api/v1/websocket",
                transports: ["websocket"]
            });
            this.subscribeToWebsocketEvents();
        }
    };

    @action
    subscribeToWebsocketEvents = () => {
        if (this.socketIoClient) {
            this.socketIoClient.on(
                'FOLLOW',
                notification => this.notificationsStore.addNotification(notification)
            );
            this.socketIoClient.on(
                'STATUS_REPLY',
                notification => this.notificationsStore.addNotification(notification)
            );
            this.socketIoClient.on(
                'NEW_STATUS',
                notification => {
                    console.log(notification);
                    this.notificationsStore.addNotification(notification)
                }
            );
            this.socketIoClient.on(
                'STATUS_LIKE',
                notification => this.notificationsStore.addNotification(notification)
            );
        }
    };

    @action
    disconnectFromWebsocket = () => {
        if (this.socketIoClient) {
            this.socketIoClient.disconnect();
        }
    }
}
