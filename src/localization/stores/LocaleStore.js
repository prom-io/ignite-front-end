import {action, observable, computed} from "mobx";
import englishDateFnsLocale from "date-fns/locale/en-US";
import koreanDateFnsLocale from "date-fns/locale/ko";
import {en, kr} from "../translations";
import {axiosInstance} from "../../api/axios-instance";

const dateFnsLocalesMap = {
    en: englishDateFnsLocale,
    kr: koreanDateFnsLocale
};

const getInitialLanguage = () => {
    const localStorageLanguage = localStorage.getItem("language");

    if (localStorageLanguage) {
        if (localStorageLanguage === "en" || localStorageLanguage === "kr") {
            return localStorageLanguage;
        }
    }

    return "en";
};

export class LocaleStore {
    @observable
    selectedLanguageContainer = {
        selectedLanguage: getInitialLanguage()
    };

    @observable
    labels = {
        en,
        kr
    };

    authorizationStore = undefined;

    @computed
    get selectedLanguage() {
        return this.selectedLanguageContainer.selectedLanguage;
    }

    @computed
    get selectedLanguageLabels() {
        return this.labels[this.selectedLanguage];
    }

    @computed
    get dateFnsLocale() {
        return dateFnsLocalesMap[this.selectedLanguage];
    }

    @computed
    get currentUser() {
        return this.authorizationStore.currentUser;
    }

    constructor(authorizationStore) {
        this.authorizationStore = authorizationStore;
    }

    @action
    setSelectedLanguage = (language, abortCallingBackendApi = false) => {
        localStorage.setItem("language", language);
        this.selectedLanguageContainer = {
            ...this.selectedLanguageContainer,
            selectedLanguage: language
        };

        if (!abortCallingBackendApi && this.currentUser) {
            axiosInstance.put("/api/v1/accounts/preferences", {language});
        }
    }
}
