import {action, computed, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

export class CreateStatusStore {
    @observable
    content = "";

    @observable
    referredStatus = undefined;

    @observable
    statusReferenceType = undefined;

    @observable
    pendingRepostsMap = {};

    @observable
    pendingCommentsRepostsMap = {};

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

    @computed
    get mediaAttachments() {
        return this.uploadMediaAttachmentsStore.mediaAttachmentsFiles
            .filter(fileContainer => fileContainer.uploadedMediaAttachment)
            .map(fileContainer => fileContainer.uploadedMediaAttachment.id);
    }

    uploadMediaAttachmentsStore = undefined;

    constructor(uploadMediaAttachmentsStore) {
        this.uploadMediaAttachmentsStore = uploadMediaAttachmentsStore;
    }

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
        if ((this.content.length !== 0 && this.content.length <= 250) || (this.mediaAttachments.length !== 0 || (this.referredStatus && this.statusReferenceType === "REPOST"))) {
            this.pending = true;
            this.submissionError = undefined;
            const referredStatusId = this.referredStatus && this.referredStatus.id;

            if (referredStatusId && this.statusReferenceType === "REPOST") {
                this.pendingRepostsMap = {
                    ...this.pendingRepostsMap,
                    [referredStatusId]: true
                }
            }

            const statusReferenceType = this.statusReferenceType;

            axiosInstance.post("/api/v1/statuses", {
                status: this.content,
                media_attachments: this.mediaAttachments,
                referred_status_id: referredStatusId,
                status_reference_type: this.statusReferenceType
            })
                .then(({data}) => {
                    this.createdStatus = data;
                    this.setContent("");
                    this.uploadMediaAttachmentsStore.reset();
                    this.createStatusDialogOpen = false;

                    this.referredStatus = undefined;
                    this.statusReferenceType = undefined;
                })
                .catch(error => this.submissionError = error)
                .finally(() => {
                    this.pending = false;
                    if (referredStatusId && statusReferenceType === "REPOST") {
                        this.pendingRepostsMap = {
                            ...this.pendingRepostsMap,
                            [referredStatusId]: false
                        }
                    }
                })
        }
    };

    @action
    setReferredStatus = referredStatus => {
        this.referredStatus = referredStatus;
    };

    @action
    setStatusReferenceType = statusReferenceType => {
        this.statusReferenceType = statusReferenceType;
    }
}
