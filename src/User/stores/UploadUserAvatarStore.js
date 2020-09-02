import { action, observable } from "mobx";
import { FileContainer, dataURLtoFile } from "../../utils/file-utils";
import { axiosInstance } from "../../api/axios-instance";

export class UploadUserAvatarStore {
    @observable
    avatarFileContainer = undefined;

    @observable
    openAvatarCropDialog = false;

    @observable
    fileToCropUrl = undefined;

    @observable
    pending = false;

    @action
    uploadFile = croppedImage => {
        this.pending = true;

        const file = dataURLtoFile(croppedImage, new Date().getTime());
        this.avatarFileContainer = new FileContainer(file, undefined, true);

        const formData = new FormData();
        formData.append("file", file);

        axiosInstance
            .post("/api/v1/media", formData)
            .then(({ data }) => {
                this.avatarFileContainer = new FileContainer(
                    this.avatarFileContainer.file,
                    undefined,
                    false,
                    data
                );
                this.openAvatarCropDialog = false;
            })
            .catch(error => console.log(error))
            .finally(() => (this.pending = false));
    };

    @action
    setOpenAvatarCropDialog = (openAvatarCropDialog, file) => {
        this.openAvatarCropDialog = openAvatarCropDialog;
        if (openAvatarCropDialog) {
            this.fileToCropUrl = URL.createObjectURL(file);
        }
    };

    @action
    reset = () => {
        this.avatarFileContainer = undefined;
    };
}
