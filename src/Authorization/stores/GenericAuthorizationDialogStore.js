import {action, observable} from "mobx";

export class GenericAuthorizationDialogStore {
    @observable
    genericAuthorizationDialogOpen = false;

    @observable
    genericAuthorizationDialogType = 'signUp';
    
    @observable
    genericAuthorizationDialogTempType = 'attention';

    @action
    setGenericAuthorizationDialogOpen = genericDialogOpen => {
        this.genericAuthorizationDialogOpen = genericDialogOpen;
    };

    @action
    setGenericAuthorizationDialogType = genericDialogType => {
        this.genericAuthorizationDialogType = genericDialogType;
    };
    
    @action
    setGenericAuthorizationDialogTempType = genericDialogTempType => {
        this.genericAuthorizationDialogTempType = genericDialogTempType;
    };
}
