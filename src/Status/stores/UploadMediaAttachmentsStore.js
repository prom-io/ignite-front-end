import {action, observable} from "mobx";
import randomString from "random-string";
import {axiosInstance} from "../../api/axios-instance";
import {FileContainer} from "../../utils/file-utils";

const MAX_FILE_SIZE = 3145728;

export class UploadMediaAttachmentsStore {
    @observable
    mediaAttachmentsFiles = [];

    @observable
    uploadPending = false;

    @observable
    error = undefined;

    @observable
    showErrorSnackbar = false;

    @observable
    errorSnackbarLabel = undefined;

    @action
    setShowErrorSnackbar = (showErrorSnackbar, errorSnackbarLabel = undefined) => {
        this.showErrorSnackbar = showErrorSnackbar;
        this.errorSnackbarLabel = errorSnackbarLabel;
    };

    @action
    attachFiles = files => {
        const attachmentsRemaining = 10 - this.mediaAttachmentsFiles.length;

        if (files.length > attachmentsRemaining) {
            files = Array.prototype.slice.call(files, 0, attachmentsRemaining);
        }

        for (let file of files) {

            if (file.size > MAX_FILE_SIZE) {
                this.showErrorSnackbar = true;
                this.errorSnackbarLabel = "file.too-large";
                continue;
            }

            const fileId = randomString({length: 7});
            this.uploadPending = true;
            this.mediaAttachmentsFiles = [
                ...this.mediaAttachmentsFiles,
                new FileContainer(file, fileId, true)
            ];
            this.uploadFile(file, fileId)
        }
    };

    @action
    uploadFile = (file, localFileId) => {
        const formData = new FormData();
        formData.append("file", file);

        axiosInstance.post("/api/v1/media", formData)
            .then(({data}) => {
                try {
                    this.mediaAttachmentsFiles = this.mediaAttachmentsFiles.map(fileContainer => {
                        if (fileContainer.fileId === localFileId) {
                            fileContainer.pending = false;
                            fileContainer.uploadedMediaAttachment = data;
                        }
                        return fileContainer;
                    });
                } catch (error) {
                    console.log(error);
                    throw error;
                }

            })
            .catch(error => this.error = error)
            .finally(() => this.uploadPending = false);
    };

    @action
    removeAttachedFileById = id => {
        this.mediaAttachmentsFiles = this.mediaAttachmentsFiles.filter(fileContainer => fileContainer.fileId !== id);
    };

    @action
    reset = () => {
        this.uploadPending = false;
        this.mediaAttachmentsFiles = [];
    }
}
