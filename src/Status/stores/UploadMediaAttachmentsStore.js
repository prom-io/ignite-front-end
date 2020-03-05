import {action, observable} from "mobx";
import randomString from "random-string";
import {axiosInstance} from "../../api/axios-instance";

class FileContainer {
    constructor(file, fileId, pending, uploadedMediaAttachment = undefined) {
        this.file = file;
        this.fileId = fileId;
        this.pending = pending;
        this.url = URL.createObjectURL(file);
        this.uploadedMediaAttachment = uploadedMediaAttachment;
    }
}

export class UploadMediaAttachmentsStore {
    @observable
    mediaAttachmentsFiles = [];

    @observable
    uploadPending = false;

    @observable
    error = undefined;

    @action
    attachFiles = files => {
        for (let file of files) {
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
