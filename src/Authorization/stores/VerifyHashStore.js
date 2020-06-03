import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class VerifyHashStore {
    @observable
    transactionId = '';

    @observable
    pending = false;

    @observable
    error = undefined;

    @observable
    createdUser = undefined;

    genericAuthorizationDialogStore = undefined;

    constructor(genericAuthorizationDialogStore) {
        this.genericAuthorizationDialogStore = genericAuthorizationDialogStore;
    }

    @action
    setTransactionId = transactionId => {
        this.transactionId = transactionId;
    };

    @action
    verifyHash = () => {
        this.pending = true;
        this.error = undefined;

        axiosInstance.post('/api/v1/sign-up', {
            transaction_id: this.transactionId
        })
            .then(({data}) => {
                this.createdUser = data;
                this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('welcome');
            })
            .catch(error => {
                this.error = error;
                this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('errorVerify')
            })
            .finally(() => this.pending = false)
    }
}
