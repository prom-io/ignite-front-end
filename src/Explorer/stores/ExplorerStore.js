import axios from "axios";
import { observable, action } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class ExplorerStore {
    @observable
    tableHashes = [];

    @observable
    pending = false;

    @observable
    detailsPending = false;

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

        axios
            .get(
                `http://188.166.18.41/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
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

        axios
            .get(
                `http://188.166.18.41/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
            )
            .then(({ data }) => {
                this.tableHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    fetchEthereumMainne = (page = 0, rowsPerPage = 10) => {
        this.pending = true;

        axios
            .get(
                `http://188.166.18.41/api/v1/main-network/root-chain/all/${page}/${rowsPerPage}`
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

        axios
            .get(
                `http://188.166.18.41/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
            )
            .then(({ data }) => {
                this.tableHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending = false));
    };

    @action
    fetchDetails = (type, id) => {
        this.detailsPending = true;
        this.typeDetails = type;
        let url;

        switch (type) {
            case "ethereum-plasma":
                url = `plasma-network/cid-block/block/${id}`;
                break;
            case "distributed-storage":
                url = `plasma-network/cid-block/block/${id}`;
                break;
            case "ethereum-mainnet":
                url = `plasma-network/cid-block/block/${id}`;
                break;
            case "binance-smart-chain":
                url = `binance-smart-chain-test-network/cid-chain/block/${id}`;
                break;
            default:
                return;
        }

        axios
            .get(`http://188.166.18.41/api/v1/${url}`)
            .then(({ data }) => {
                console.log(data)
                this.modalDetails = data;
            })
            .catch(() => {})
            .finally(() => (this.detailsPending = false));
    };

    @action
    setModalIsOpen = (modalIsOpen, type, id) => {
        this.modalIsOpen = modalIsOpen;
        if (modalIsOpen) {
            this.modalDetails = {};
            this.fetchDetails(type, id);
        }
    };
}
