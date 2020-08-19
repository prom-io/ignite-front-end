import { observable, action } from "mobx";

export class MemezatorDialogStore {
    @observable
    memezatorDialogOpen = false;

    @observable
    memezatorError = undefined;

    @action
    setMemezatorDialogOpen = (memezatorDialogOpen, memezatorError) => {
        this.memezatorDialogOpen = memezatorDialogOpen;
        if (memezatorError) {
            this.memezatorError = memezatorError;
        }
    };

    @action
    openDialogByError = error => {
        if (error.response && error.response.status === 403) {
            this.memezatorDialogOpen = true;
            if (error.response.data.message.includes("User cannot unlike meme")) {
                this.memezatorError = "memezator.dialog.unlike";
            } else if (error.response.data.message.includes("User cannot like his own meme")) {
                this.memezatorError = "memezator.dialog.own-meme";
            } else if (error.response.data.message.includes("Current user has already liked")) {
                this.memezatorError = "memezator.dialog.already";
            } else if (error.response.data.message.includes("Statuses which have not been liked by current user can't be unliked")) {
                this.memezatorError = "dialog.favourite.can-not-unliked";
            }
        }
    };
}
