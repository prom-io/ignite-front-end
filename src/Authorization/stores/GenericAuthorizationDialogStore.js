import {action, observable} from "mobx";

export class GenericAuthorizationDialogStore {
    @observable
    genericAuthorizationDialogOpen = false;

    @observable
    genericAuthorizationDialogType = 'signUp';

    @action
    setGenericAuthorizationDialogOpen = genericDialogOpen => {
        this.genericAuthorizationDialogOpen = genericDialogOpen;
    };

    @action
    setGenericAuthorizationDialogType = genericDialogType => {
        this.genericAuthorizationDialogType = genericDialogType;
    };
}
