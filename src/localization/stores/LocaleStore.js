import {action, observable, computed} from "mobx";
import {en, ko} from "../translations";
import englishDateFnsLocale from "date-fns/locale/en-US";
import koreanDateFnsLocale from "date-fns/locale/ko";

const dateFnsLocalesMap = {
    en: englishDateFnsLocale,
    ko: koreanDateFnsLocale
};

const getInitialLanguage = () => {
    const localStorageLanguage = localStorage.getItem("language");

    if (localStorageLanguage) {
        if (localStorageLanguage === "en" || localStorageLanguage === "ko") {
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
        ko
    };

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

    @action
    setSelectedLanguage = language => {
        localStorage.setItem("language", language);
        this.selectedLanguageContainer.selectedLanguage = language;
    }
}
