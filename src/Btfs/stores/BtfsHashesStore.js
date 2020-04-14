import {observable, action} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class BtfsHashesStore {
    @observable
    btfsHashes = [];

    @observable
    pending = false;

    @observable
    error = undefined;

    @action
    fetchBtfsHashes = () => {
        this.pending = true;
        this.error = undefined;

        axiosInstance.get("/api/v3/btfs")
            .then(({data}) => {
                this.btfsHashes = data;
                this.pending = false;
            })
            .catch(error => this.error = error);
    }
}
