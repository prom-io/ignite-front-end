import {action, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class CreateStatusStore {
    @observable
    content = "";

    @observable
    pending = false;

    @observable
    createStatusDialogOpen = false;

    @observable
    inputExpanded = false;

    @observable
    charactersRemaining = 250;

    @observable
    submissionError = undefined;

    @observable
    createdStatus = undefined;

    @action
    setContent = content => {
        this.content = content;
        this.charactersRemaining = 250 - content.length;
    };

    @action
    setCreateStatusDialogOpen = createStatusDialogOpen => {
        this.createStatusDialogOpen = createStatusDialogOpen;
    };

    @action
    setInputExpanded = inputExpanded => {
        this.inputExpanded = inputExpanded;
    };

    @action
    createStatus = () => {
        if (this.content.length !== 0 && this.content.length <= 250) {
            this.pending = true;
            this.submissionError = undefined;

            axiosInstance.post("/api/v1/statuses", {status: this.content})
                .then(({data}) => {
                    this.createdStatus = data;
                    this.setContent("");
                })
                .catch(error => this.submissionError = error)
                .finally(() => this.pending = false)
        }
    }
}
