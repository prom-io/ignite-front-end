import {action, observable} from "mobx";
import {FileContainer} from "../../utils/file-utils";
import {axiosInstance} from "../../api/axios-instance";

export class UploadUserAvatarStore {
    @observable
    avatarFileContainer = undefined;

    @action
    uploadFile = file => {
        this.avatarFileContainer = new FileContainer(
            file,
            undefined,
            true
        );

        const formData = new FormData();
        formData.append("file", file);

        axiosInstance.post("/api/v1/media", formData)
            .then(({data}) => this.avatarFileContainer = new FileContainer(
                this.avatarFileContainer.file,
                undefined,
                false,
                data
            ));
    };

    @action
    reset = () => {
        this.avatarFileContainer = undefined;
    }
}
