import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class TransactionsStore {
    @observable
    transactions = [];

    @observable
    page = 0;

    @observable
    pending = false;

    @observable
    hasMore = true;

    @action
    fetchTransactions = () => {
        this.pending = true;

        let searchUrl;
        if (this.page === 0) {
            searchUrl = `/api/v1/accounts/current/transactions?take=15`;
        } else {
            const skip = this.page * 15;
            searchUrl = `/api/v1/accounts/current/transactions?skip=${skip}&take=15`;
        }

        axiosInstance
            .get(searchUrl)
            .then(({ data }) => {
                if (data.length > 0) {
                    this.transactions.push(...data);
                    this.page++;
                } else {
                    this.hasMore = false;
                }
            })
            .finally(() => (this.pending = false));
    };

    @action
    reset = () => {
        this.transactions = [];
        this.hasMore = true;
        this.page = 0;
    };
}
