import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export const HashVerificationMode = {
    SIGN_UP: 'SIGN_UP',
    RESET_PASSWORD: 'RESET_PASSWORD'
};

export class VerifyHashStore {
    @observable
    transactionId = '';

    @observable
    pending = false;

    @observable
    error = undefined;

    @observable
    createdUser = undefined;

    @observable
    hashVerificationMode = HashVerificationMode.SIGN_UP;

    genericAuthorizationDialogStore = undefined;

    constructor(genericAuthorizationDialogStore) {
        this.genericAuthorizationDialogStore = genericAuthorizationDialogStore;
    }

    @action
    setTransactionId = transactionId => {
        this.transactionId = transactionId;
    };

    @action
    setHashVerificationMode = hashVerificationMode => {
        this.hashVerificationMode = hashVerificationMode;
    };

    @action
    verifyHash = () => {
        this.pending = true;
        this.error = undefined;

        if (this.hashVerificationMode === HashVerificationMode.SIGN_UP) {
            axiosInstance.post('/api/v1/sign-up', {
                transaction_id: this.transactionId
            })
                .then(({data}) => {
                    this.createdUser = data;
                    this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('welcome');
                })
                .catch(error => {
                    this.error = error;
                    this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('verifyError')
                })
                .finally(() => this.pending = false)
        } else {
            axiosInstance.put('/api/v1/accounts/password', {
                transaction_id: this.transactionId
            })
                .then(({data}) => {
                    this.createdUser = data;
                    this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('passwordUpdated');
                })
                .catch(error => {
                    this.error = error;
                    this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('verifyError');
                })
        }
    }
}
