import {observable, action} from "mobx";
import {axiosInstance} from "../../api/axios-instance";
import {isStringEmpty} from "../../utils/string-utils";

export class CreateCommentStore {
    @observable
    text = "";

    @observable
    pending = false;

    statusId = undefined;
    onCommentCreated = undefined;

    constructor(statusId, onCommentCreated) {
        this.statusId = statusId;
        this.onCommentCreated = onCommentCreated;
    }

    @action
    setText = text => {
        this.text = text;
    };

    @action
    createComment = () => {
        if (!isStringEmpty(this.text)) {
            this.pending = axiosInstance.post(`/api/v1/statuses/${this.statusId}/comments`, {text: this.text})
                .then(({data}) => {
                    this.text = "";
                    if (this.onCommentCreated) {
                        this.onCommentCreated(data);
                    }
                })
                .finally(() => this.pending = false);
        }
    }
}
