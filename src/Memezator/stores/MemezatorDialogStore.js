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
            const errorCode = error.response.data.code;

            if (errorCode === "CANNOT_DISLIKE_A_MEME") {
                this.memezatorError = "memezator.dialog.unlike";
            } else if (errorCode === "CANNOT_VOTE_FOR_OWN_MEME") {
                this.memezatorError = "memezator.dialog.own-meme";
            } else if (errorCode === "LIMIT_EXCEEDED") {
                this.memezatorError = "memezator.dialog.already";
            } else if (errorCode === "CANNOT_VOTE_FOR_OLD_MEMES") {
                this.memezatorError = "memezator.dialog.old-meme";
            } else if (errorCode === "STATUS_HAVE_NOT_BEEN_LIKED") {
                this.memezatorError = "dialog.favourite.can-not-unliked";
            } else if (errorCode === "DOESNT_HAVE_ENOUGH_POSTS") {
                this.memezatorError = "status.placeholder.have-no-posts";
            } else if (errorCode === "MISSING_AVATAR_OR_USERNAME_OR_BIO") {
                this.memezatorError = "status.placeholder.missing-info";
            } else if (errorCode === "CANNOT_CREATE_MEME_WITHOUT_ATTACHMENTS") {
                this.memezatorError = "memezator.dialog.without-attachments";
            } else {
                this.memezatorError = "dialog.something-wrong";
            }
        }
    };
}
