import {action, computed, observable} from "mobx";
import {axiosInstance} from "../../api/axios-instance";

const STATUS_TEXT_LENGTH_LIMIT = 1000;

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
    emojiPickerVisible = false;

    @observable
    emojiPickerDialogVisible = false;

    @observable
    inputExpanded = false;

    @observable
    charactersRemaining = STATUS_TEXT_LENGTH_LIMIT;

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

    @computed
    get mediaAttachmentUploadPending() {
        return this.uploadMediaAttachmentsStore.mediaAttachmentsFiles
            .filter(fileContainer => fileContainer.pending)
            .length !== 0;
    }

    uploadMediaAttachmentsStore = undefined;

    constructor(uploadMediaAttachmentsStore) {
        this.uploadMediaAttachmentsStore = uploadMediaAttachmentsStore;
    }

    @action
    setContent = content => {
        if (STATUS_TEXT_LENGTH_LIMIT - content.length >= 0) {
            this.content = content;
            this.charactersRemaining = STATUS_TEXT_LENGTH_LIMIT - content.length;
        }
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
        if ((this.content.length !== 0 && this.content.length <= STATUS_TEXT_LENGTH_LIMIT) || (this.mediaAttachments.length !== 0 || (this.referredStatus && this.statusReferenceType === "REPOST"))) {
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
                    this.referredStatus.can_be_reposted = false;
                    
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

    @action
    setEmojiPickerVisible = emojiPickerVisible => {
        this.emojiPickerVisible = emojiPickerVisible;
    }

    @action
    setEmojiPickerDialogVisible = emojiPickerDialogVisible => {
        this.emojiPickerDialogVisible = emojiPickerDialogVisible;
    }

    @action
    addEmoji = e => {
        // let newContent = this.content + e.native;
        
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach(el => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        let newContent = this.content + emoji;

        if (STATUS_TEXT_LENGTH_LIMIT - newContent.length >= 0) {
            this.content = newContent;
            this.charactersRemaining = STATUS_TEXT_LENGTH_LIMIT - newContent.length;
        }
    };
}
