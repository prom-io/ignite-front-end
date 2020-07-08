import axios from "axios";
import { observable, action } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class ExplorerStore {
    @observable
    tableHashes = [];

    @observable
    pending = false;

    @observable
    error = undefined;

    @observable
    modalIsOpen = false;

    @observable
    modalDetails = {};

    @observable
    typeDetails = undefined;

    @action
    fetchBtfsHashes = () => {
        this.pending = true;
        this.error = undefined;

        axiosInstance
            .get("/api/v3/btfs")
            .then(({ data }) => {
                this.tableHashes = data;
                this.pending = false;
            })
            .catch(error => (this.error = error));
    };

    @action
    fetchEthereumPlasma = (page = 0, rowsPerPage = 10) => {
        this.pending = true;
        this.error = undefined;

        axios
            .get(
                `https://st.ignite.so/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
            )
            .then(({ data }) => {
                this.tableHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    fetchDistributedStorage = (page = 0, rowsPerPage = 10) => {
        this.pending = true;
        this.error = undefined;

        axios
            .get(
                `https://st.ignite.so/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
            )
            .then(({ data }) => {
                this.tableHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    fetchBinanceSmartChain = (page = 0, rowsPerPage = 10) => {
        this.pending = true;
        this.error = undefined;

        axios
            .get(
                `https://st.ignite.so/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
            )
            .then(({ data }) => {
                this.tableHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    setModalIsOpen = (modalIsOpen, type, data) => {
        this.modalIsOpen = modalIsOpen;
        if (modalIsOpen) {
            this.typeDetails = type;
            this.modalDetails = data;
        }
    };
}
