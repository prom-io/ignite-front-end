import {observable, action} from "mobx";

export class StatusBtfsInfoStore {
    @observable
    btfsInfo = undefined;

    @observable
    btfsInfoDialogOpen = false;

    @action
    setBtfsInfo = btfsInfo => {
        console.log(btfsInfo);
        this.btfsInfo = btfsInfo;
    };

    @action
    setBtfsInfoDialogOpen = btfsInfoDialogOpen => {
        this.btfsInfoDialogOpen = btfsInfoDialogOpen;
    }
}
