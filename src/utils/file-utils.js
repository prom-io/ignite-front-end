export class FileContainer {
    constructor(file, fileId, pending, uploadedMediaAttachment = undefined) {
        this.file = file;
        this.fileId = fileId;
        this.pending = pending;
        this.url = URL.createObjectURL(file);
        this.uploadedMediaAttachment = uploadedMediaAttachment;
    }
}

export const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};
