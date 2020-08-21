import { action, reaction, observable, computed } from "mobx";
import { axiosInstance } from "../../api/axios-instance";
import {
    validateBio,
    validateDisplayName,
    validateUsername,
    validateExternalUrl
} from "../validation";

export class UpdateUserProfileStore {
    @observable
    updateUserProfileForm = {
        username: "",
        displayName: "",
        avatarId: undefined,
        language: "",
        bio: "",
        external_url: ""
    };

    @observable
    formErrors = {
        username: undefined,
        displayName: undefined,
        bio: undefined,
        external_url: undefined
    };

    @observable
    pending = false;

    @observable
    checkingUsernameAvailability = false;

    @observable
    submissionError = undefined;

    @observable
    openSuccessDialog = false;

    authorizationStore = undefined;
    uploadUserAvatarStore = undefined;
    userProfileStore = undefined;
    localeStore = undefined;

    @computed
    get currentUser() {
        return this.authorizationStore.currentUser;
    }

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
        return (
            this.uploadUserAvatarStore.avatarFileContainer &&
            this.uploadUserAvatarStore.avatarFileContainer.pending
        );
    }

    @computed
    get currentLanguage() {
        return this.localeStore.selectedLanguage;
    }

    constructor(
        authorizationStore,
        uploadUserAvatarStore,
        userProfileStore,
        localeStore
    ) {
        this.authorizationStore = authorizationStore;
        this.uploadUserAvatarStore = uploadUserAvatarStore;
        this.userProfileStore = userProfileStore;
        this.localeStore = localeStore;

        reaction(
            () => this.currentUser,
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
            displayName =>
                (this.formErrors.displayName = validateDisplayName(displayName))
        );

        reaction(
            () => this.updateUserProfileForm.bio,
            bio => (this.formErrors.bio = validateBio(bio))
        );

        reaction(
            () => this.updateUserProfileForm.external_url,
            external_url =>
                (this.formErrors.external_url = validateExternalUrl(external_url))
        );

        reaction(
            () => this.avatarFileContainer,
            avatarFileContainer => {
                if (
                    avatarFileContainer &&
                    avatarFileContainer.uploadedMediaAttachment
                ) {
                    this.setFormValue(
                        "avatarId",
                        avatarFileContainer.uploadedMediaAttachment.id
                    );
                }
            }
        );

        reaction(
            () => this.currentUser,
            currentUser => {
                if (
                    currentUser &&
                    this.currentUser.username === this.updateUserProfileForm.username
                ) {
                    this.formErrors.username = undefined;
                }
            }
        );
    }

    @action
    setFormValue = (key, value) => {
        this.updateUserProfileForm[key] = value;
    };

    @action
    updateUser = () => {
        if (!this.currentUser) {
            return;
        }

        if (!this.validateForm()) {
            return;
        }

        this.pending = true;

        axiosInstance
            .put(`/api/v1/accounts/${this.currentUser.id}`, {
                username: this.updateUserProfileForm.username,
                display_name: this.updateUserProfileForm.displayName,
                avatar_id: this.updateUserProfileForm.avatarId,
                bio: this.updateUserProfileForm.bio,
                preferences: {
                    language: this.updateUserProfileForm.language
                },
                external_url: this.updateUserProfileForm.external_url
            })
            .then(({ data }) => {
                this.openSuccessDialog = true;

                this.localeStore.setSelectedLanguage(
                    this.updateUserProfileForm.language,
                    true
                );
                this.userProfileStore.setUser(data);

                if (this.currentUser) {
                    this.authorizationStore.setCurrentUser({
                        ...this.currentUser,
                        username: data.username,
                        display_name: data.display_name,
                        bio: data.bio,
                        avatar: data.avatar,
                        external_url: data.external_url
                    });
                }
            })
            .catch(error => (this.submissionError = error))
            .finally(() => (this.pending = false));
    };

    @action
    validateForm = () => {
        const originalUsernameError = this.formErrors.username;
        this.formErrors = {
            username:
                this.currentUser.username !== this.updateUserProfileForm.username
                    ? validateUsername(this.updateUserProfileForm.username)
                    : undefined,
            displayName: validateDisplayName(this.updateUserProfileForm.displayName),
            bio: validateBio(this.updateUserProfileForm.bio),
            external_url: validateExternalUrl(
                this.updateUserProfileForm.external_url
            )
        };

        if (originalUsernameError === "user.username.has-already-been-taken") {
            this.formErrors.username = originalUsernameError;
        }

        const { username, displayName, bio, external_url } = this.formErrors;

        return Boolean(!(username || displayName || bio || external_url));
    };

    @action
    checkUsernameAvailability = () => {
        const username = this.updateUserProfileForm.username.toLowerCase();
        this.checkingUsernameAvailability = true;

        axiosInstance
            .get(`/api/v1/accounts/username/${encodeURI(username)}/is-available`)
            .then(({ data }) => {
                if (!data.available) {
                    this.formErrors.username =
                        "user.username.has-already-been-taken";
                }
            })
            .finally(() => (this.checkingUsernameAvailability = false));
    };

    @action
    setOpenSuccessDialog = openSuccessDialog => {
        this.openSuccessDialog = openSuccessDialog;
    };

    @action
    resetForm = () => {
        this.updateUserProfileForm = {
            username: this.currentUser ? this.currentUser.username : "",
            displayName: this.currentUser ? this.currentUser.display_name : "",
            avatarId: undefined,
            bio: this.currentUser ? this.currentUser.bio : "",
            external_url: this.currentUser ? this.currentUser.external_url : "",
            language: this.localeStore.selectedLanguage
        };
        this.uploadUserAvatarStore.reset();
        setTimeout(
            () =>
                (this.formErrors = {
                    username: undefined,
                    displayName: undefined,
                    bio: undefined,
                    language: undefined,
                    external_url: undefined
                })
        );
    };
}
