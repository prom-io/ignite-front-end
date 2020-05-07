export class FileContainer {
    constructor(file, fileId, pending, uploadedMediaAttachment = undefined) {
        this.file = file;
        this.fileId = fileId;
        this.pending = pending;
        this.url = URL.createObjectURL(file);
        this.uploadedMediaAttachment = uploadedMediaAttachment;
    }
}
