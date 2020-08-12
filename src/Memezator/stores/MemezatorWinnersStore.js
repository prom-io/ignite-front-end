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
                    points: 17
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    points: 14
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    points: 13
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    points: 11
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    points: 8
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    points: 6
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    points: 5
                },
                {
                    avatar:
                        "https://beta.ignite.so/api/v1/media/f3aef02b-18d7-49ff-b21e-f62c6cd8f80b.png",
                    display_name: "Prometeus Labs",
                    id: "0x2643DC5CB19b4e43C491f9D556263626a1791183",
                    username: "promlabs",
                    points: 4
                }
            ];
            this.pending = false;
        }, 1500);
    };

    @action
    reset = () => {
        this.recentWinners = [];
    };
}
