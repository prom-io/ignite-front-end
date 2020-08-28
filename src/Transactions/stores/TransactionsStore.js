import { action, observable } from "mobx";
import { axiosInstance } from "../../api/axios-instance";

export class TransactionsStore {
    @observable
    transactions = [];

    @observable
    pending = false;

    @action
    fetchTransactions = () => {
        this.pending = true;

        setTimeout(() => {
            this.transactions = [
                {
                    txnId: "0x553e27288406b577cab41cccc65b7f47eae1d606beb2796651d6bb60214e63601",
                    date: "20.02.2020, 20:20:20",
                    status: "Approved",
                    count: "123.55 PROM",
                    type: "up",
                    text: "Memezator prize"
                },
                {
                    txnId: "0x553e27288406b577cab41cccc65b7f47eae1d606beb2796651d6bb60214e63602",
                    date: "20.02.2020, 20:20:20",
                    status: "Pending",
                    count: "123.55 PROM",
                    type: "down",
                    text: "P2P transaction"
                },
                {
                    txnId: "0x553e27288406b577cab41cccc65b7f47eae1d606beb2796651d6bb60214e63603",
                    date: "20.02.2020, 20:20:20",
                    status: "Approved",
                    count: "123.55 PROM",
                    type: "up",
                    text: "Memezator prize"
                },
                {
                    txnId: "0x553e27288406b577cab41cccc65b7f47eae1d606beb2796651d6bb60214e63604",
                    date: "20.02.2020, 20:20:20",
                    status: "Pending",
                    count: "123.55 PROM",
                    type: "down",
                    text: "P2P transaction"
                }
            ];
            this.pending = false;
        }, 1000)
    };

    @action
    reset = () => {
        this.transactions = [];
    };
}
