import axios from "axios";
import { observable, action } from "mobx";

export class MemezatorWinnersStore {
    @observable
    recentWinners = [];

    @observable
    pending = false;

    @action
    fetchRecentWinners = () => {
        this.pending = true;

        setTimeout(() => {
            this.recentWinners = [
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    likes: 123,
                    trophies: 1.234
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    likes: 123,
                    trophies: 1.234
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    likes: 123,
                    trophies: 1.234
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    likes: 123,
                    trophies: 1.234
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    likes: 123,
                    trophies: 1.234
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    likes: 123,
                    trophies: 1.234
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    likes: 123,
                    trophies: 1.234
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    likes: 123,
                    trophies: 1.234
                },
            ];
            this.pending = false;
        }, 1500);
    };

    @action
    reset = () => {
        this.recentWinners = [];
    };
}
