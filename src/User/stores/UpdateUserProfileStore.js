import {action, reaction, observable, computed} from "mobx";
import {axiosInstance} from "../../api/axios-instance";
import {validateBio, validateDisplayName, validateUsername} from "../validation";

export class UpdateUserProfileStore {
    @observable
    updateUserProfileForm = {
        username: "",
        displayName: "",
        avatarId: undefined,
        bio: ""
    };

    @observable
    formErrors = {
        username: undefined,
        displayName: undefined,
        bio: undefined
    };

    @observable
    updateUserProfileDialogOpen = false;

    @observable
    pending = false;

    @observable
    checkingUsernameAvailability = false;

    @observable
    submissionError = undefined;

    authorizationStore = undefined;
    uploadUserAvatarStore = undefined;
    userProfileStore = undefined;

    @computed
    get currentUser() {
        return this.authorizationStore.currentUser;
    };

    @computed
    get user() {
        return this.userProfileStore.user;
    }

    @computed
    get avatarFileContainer() {
        return this.uploadUserAvatarStore.avatarFileContainer;
    }

    @computed
    get avatarUploadPending() {
        return this.uploadUserAvatarStore.avatarFileContainer && this.uploadUserAvatarStore.avatarFileContainer.pending;
    }

    constructor(authorizationStore, uploadUserAvatarStore, userProfileStore) {
        this.authorizationStore = authorizationStore;
        this.uploadUserAvatarStore = uploadUserAvatarStore;
        this.userProfileStore = userProfileStore;

        reaction(
            () => this.user,
            () => this.resetForm()
        );

        reaction(
            () => this.updateUserProfileForm.username,
            username => {
                if (this.currentUser && this.currentUser.username === username) {
                    return;
                }

                this.formErrors.username = validateUsername(username);

                if (!this.formErrors.username) {
                    this.checkUsernameAvailability();
                }
            }
        );

        reaction(
            () => this.updateUserProfileForm.displayName,
            displayName => this.formErrors.displayName = validateDisplayName(displayName)
        );

        reaction(
            () => this.avatarFileContainer,
            avatarFileContainer => {
                if (avatarFileContainer && avatarFileContainer.uploadedMediaAttachment) {
                    this.setFormValue("avatarId", avatarFileContainer.uploadedMediaAttachment.id);
                }
            }
        );

        reaction(
            () => this.currentUser,
            currentUser => {
                if (currentUser && this.currentUser.username === this.updateUserProfileForm.username) {
                    this.formErrors.username = undefined;
                }
            }
        )
    }

    @action
    setFormValue = (key, value) => {
        this.updateUserProfileForm[key] = value;
    };

    @action
    setUpdateUserProfileDialogOpen = updateUserProfileDialogOpen => {
        this.updateUserProfileDialogOpen = updateUserProfileDialogOpen;
    };

    @action
    updateUser = () => {
        if (!this.currentUser || !this.user) {
            return;
        }

        if (!this.validateForm()) {
            return;
        }

        if (this.currentUser.id !== this.user.id) {
            return;
        }

        this.pending = true;

        axiosInstance.put(`/api/v1/accounts/${this.currentUser.id}`, {
            username: this.updateUserProfileForm.username,
            display_name: this.updateUserProfileForm.displayName,
            avatar_id: this.updateUserProfileForm.avatarId,
            bio: this.updateUserProfileForm.bio
        })
            .then(({data}) => {
                this.userProfileStore.setUser(data);
                this.setUpdateUserProfileDialogOpen(false);

                if (this.currentUser) {
                    this.authorizationStore.setCurrentUser({
                        ...this.currentUser,
                        username: data.username,
                        display_name: data.display_name,
                        avatar: data.avatar
                    });
                }
            })
            .catch(error => this.submissionError = error)
            .finally(() => this.pending = false);
    };

    @action
    validateForm = () => {
        const originalUsernameError = this.formErrors.username;
        this.formErrors = {
            username: validateUsername(this.updateUserProfileForm.username),
            displayName: validateDisplayName(this.updateUserProfileForm.displayName),
            bio: validateBio(this.updateUserProfileForm.bio)
        };

        if (originalUsernameError === "user.username.has-already-been-taken") {
            this.formErrors.username = originalUsernameError;
        }

        const {username, displayName, bio} = this.formErrors;

        return Boolean(!(username || displayName || bio));
    };

    @action
    checkUsernameAvailability = () => {
        const username = this.updateUserProfileForm.username;
        this.checkingUsernameAvailability = true;

        axiosInstance.get(`/api/v1/accounts/username/${username}/is-available`)
            .then(({data}) => {
                if (!data.available) {
                    this.formErrors.username = "user.username.has-already-been-taken";
                }
            })
            .finally(() => this.checkingUsernameAvailability = false);
    };

    @action
    resetForm = () => {
        this.updateUserProfileForm = {
            username: this.user ? this.user.username : "",
            displayName: this.user ? this.user.display_name : "",
            avatarId: undefined,
            bio: this.user ? this.user.bio : undefined
        };
        this.uploadUserAvatarStore.reset();
        setTimeout(() => this.formErrors = {
            username: undefined,
            displayName: undefined,
            bio: undefined
        })
    }
}
