import {action, reaction, observable, computed} from "mobx";
import {axiosInstance} from "../../api/axios-instance";
import {
    validateBio, 
    validateDisplayName, 
    validateUsername, 
    validateIsCurrentPassword,
    validatePassword
} from "../validation";

export class UpdateUserProfileStore {
    @observable
    updateUserProfileForm = {
        username: "",
        displayName: "",
        avatarId: undefined,
        language: "",
        bio: ""
    };

    @observable
    formErrors = {
        username: undefined,
        displayName: undefined,
        bio: undefined
    };

    @observable
    pending = false;

    @observable
    checkingUsernameAvailability = false;

    @observable
    submissionError = undefined;

    authorizationStore = undefined;
    uploadUserAvatarStore = undefined;
    userProfileStore = undefined;
    localeStore = undefined;

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

    @computed
    get currentLanguage() {
        return this.localeStore.selectedLanguage;
    }

    constructor(authorizationStore, uploadUserAvatarStore, userProfileStore, localeStore) {
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
    updateUser = () => {
        if (!this.currentUser) {
            return;
        }

        if (!this.validateForm()) {
            return;
        }

        this.pending = true;

        axiosInstance.put(`/api/v1/accounts/${this.currentUser.id}`, {
            username: this.updateUserProfileForm.username,
            display_name: this.updateUserProfileForm.displayName,
            avatar_id: this.updateUserProfileForm.avatarId,
            bio: this.updateUserProfileForm.bio,
            preferences: {
                language: this.updateUserProfileForm.language
            }
        })
            .then(({data}) => {
                this.localeStore.setSelectedLanguage(this.updateUserProfileForm.language, true);
                this.userProfileStore.setUser(data);

                if (this.currentUser) {
                    this.authorizationStore.setCurrentUser({
                        ...this.currentUser,
                        username: data.username,
                        display_name: data.display_name,
                        bio: data.bio,
                        avatar: data.avatar
                    });
                }
            })
            .catch(error => this.submissionError = error)
            .finally(() => this.pending = false);
    };

    @action
    updateUserPassword = () => {
        if (!this.currentUser) {
            return;
        }

        if (!this.validatePasswordForm()) {
            return;
        }

        this.pending = true;

        axiosInstance.put(`/api/v1/accounts/${this.currentUser.id}`, {
            password: this.updateUserProfileForm.password
        })
            .then(({data}) => {})
            .catch(error => this.submissionError = error)
            .finally(() => this.pending = false);
    };

    @action
    validateForm = () => {
        const originalUsernameError = this.formErrors.username;
        this.formErrors = {
            username: this.currentUser.username !== this.updateUserProfileForm.username ? validateUsername(this.updateUserProfileForm.username) : undefined,
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
    validatePasswordForm = () => {
        this.formErrors = {
            password: validateIsCurrentPassword(
                null,
                this.updateUserProfileForm.password
            ),
            new_password: validatePassword(this.updateUserProfileForm.new_password)
        };

        const {password, new_password} = this.formErrors;

        return Boolean(!(password || new_password));
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
            username: this.currentUser ? this.currentUser.username : "",
            displayName:  this.currentUser ? this.currentUser.display_name : "",
            avatarId: undefined,
            bio: this.currentUser ? this.currentUser.bio : undefined,
            language: this.localeStore.selectedLanguage,
            password: undefined,
            new_password:  undefined
        };
        this.uploadUserAvatarStore.reset();
        setTimeout(() => this.formErrors = {
            username: undefined,
            displayName: undefined,
            bio: undefined,
            language: undefined,
            password: undefined,
            new_password: undefined
        })
    }
}
