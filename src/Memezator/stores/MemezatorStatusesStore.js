import axios from "axios";
import { observable, action } from "mobx";

export class MemezatorStatusesStore {
    @observable
    statuses = [];

    @observable
    pending = false;

    @action
    fetchMemezatorStatuses = () => {
        this.pending = true;

        setTimeout(() => {
            this.statuses = [];
            this.pending = false;
        }, 1000);
    };

    @action
    reset = () => {
        this.statuses = [];
    };
}
