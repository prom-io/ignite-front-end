import {observable, action} from "mobx";

export class DrawerStore {
    @observable
    drawerExpanded = false;

    @action
    setDrawerExpanded = drawerExpanded => {
        this.drawerExpanded = drawerExpanded;
    }
}
