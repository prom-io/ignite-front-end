import { action, observable } from "mobx";
import generator from "generate-password";
import { axiosInstance } from "../../api/axios-instance";
import { FileContainer } from "../../utils/file-utils";

const MAX_FILE_SIZE = 3145728;

export class UploadMediaAttachmentsStore {
    @observable
    mediaAttachmentsFiles = [];

    @observable
    uploadPending = false;

    @observable
    showErrorModal = false;

    @observable
    errorModalLabel = undefined;

    @action
    setShowErrorModal = (showErrorModal, errorModalLabel) => {
        this.showErrorModal = showErrorModal;
        if (showErrorModal) {
            this.errorModalLabel = errorModalLabel;
        }
    };

    @action
    attachFiles = files => {
        const attachmentsRemaining = 10 - this.mediaAttachmentsFiles.length;

        if (files.length > attachmentsRemaining) {
            files = Array.prototype.slice.call(files, 0, attachmentsRemaining);
        }

        for (let file of files) {
            if (file.size > MAX_FILE_SIZE) {
                this.setShowErrorModal(true, "file.too-large");
                continue;
            }

            const fileId = generator.generate({
                length: 7,
                numbers: false,
                symbols: false,
                lowercase: true,
                uppercase: false
            });
            this.uploadPending = true;
            this.mediaAttachmentsFiles = [
                ...this.mediaAttachmentsFiles,
                new FileContainer(file, fileId, true)
            ];
            this.uploadFile(file, fileId);
        }
    };

    @action
    uploadFile = (file, localFileId) => {
        const formData = new FormData();
        formData.append("file", file);

        axiosInstance
            .post("/api/v1/media", formData)
            .then(({ data }) => {
                try {
                    this.mediaAttachmentsFiles = this.mediaAttachmentsFiles.map(
                        fileContainer => {
                            if (fileContainer.fileId === localFileId) {
                                fileContainer.pending = false;
                                fileContainer.uploadedMediaAttachment = data;
                            }
                            return fileContainer;
                        }
                    );
                } catch (error) {
                    throw error;
                }
            })
            .catch(() => {
                this.setShowErrorModal(true, "file.something-wrong");
                this.removeAttachedFileById(localFileId);
            })
            .finally(() => (this.uploadPending = false));
    };

    @action
    removeAttachedFileById = id => {
        this.mediaAttachmentsFiles = this.mediaAttachmentsFiles.filter(
            fileContainer => fileContainer.fileId !== id
        );
    };

    @action
    reset = () => {
        this.uploadPending = false;
        this.mediaAttachmentsFiles = [];
    };
}
