import axios from "axios";
import { observable, action } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class ExplorerStore {
    @observable
    btfsHashes = [];
    ethereumHashes = [];
    distributedHashes = [];
    binanceHashes = [];

    @observable
    pending = {
        btfs: false,
        ethereum: false,
        distributed: false,
        binance: false
    };

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
        this.pending.btfs = true;
        this.error = undefined;

        axiosInstance
            .get("/api/v3/btfs")
            .then(({ data }) => {
                this.btfsHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending.btfs = false));
    };

    @action
    fetchEthereumPlasma = (page = 0, rowsPerPage = 10) => {
        this.pending.ethereum = true;
        this.error = undefined;

        axios
            .get(
                `https://st.ignite.so/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
            )
            .then(({ data }) => {
                this.ethereumHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending.ethereum = false));
    };

    @action
    fetchDistributedStorage = (page = 0, rowsPerPage = 10) => {
        this.pending.distributed = true;
        this.error = undefined;

        axios
            .get(
                `https://st.ignite.so/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
            )
            .then(({ data }) => {
                this.distributedHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending.distributed = false));
    };

    @action
    fetchBinanceSmartChain = (page = 0, rowsPerPage = 10) => {
        this.pending.binance = true;
        this.error = undefined;

        axios
            .get(
                `https://st.ignite.so/api/v1/plasma-network/cid-block/all/${page}/${rowsPerPage}`
            )
            .then(({ data }) => {
                this.binanceHashes = data;
            })
            .catch(error => (this.error = error))
            .finally(() => (this.pending.binance = false));
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
