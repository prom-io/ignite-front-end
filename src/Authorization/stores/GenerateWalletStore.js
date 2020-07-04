import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class GenerateWalletStore {
    @observable
    generatedWallet = undefined;

    @observable
    pending = false;

    @observable
    error = undefined;

    genericAuthorizationDialogStore = undefined;

    constructor(genericAuthorizationDialogStore) {
        this.genericAuthorizationDialogStore = genericAuthorizationDialogStore;
    }

    @action
    generateWallet = () => {
        this.pending = true;
        this.error = undefined;

        axiosInstance.post('/api/v1/wallet')
            .then(({data}) => {
                this.generatedWallet = {
                    address: data.address,
                    privateKey: data.private_key
                };
                this.genericAuthorizationDialogStore.setGenericAuthorizationDialogType('createWallet');
            })
            .catch(error => this.error = error)
            .finally(() => this.pending = false)
    }
}
