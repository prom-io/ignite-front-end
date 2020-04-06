import {action, observable, computed} from "mobx";
import {en} from "../translations";

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
    selectedLanguage = getInitialLanguage();

    @observable
    labels = {
        en,
        ko: en
    };

    @computed
    get selectedLanguageLabels() {
        return this.labels[this.selectedLanguage];
    }

    @action
    setSelectedLanguage = language => {
        localStorage.setItem("language", language);
        this.selectedLanguage = language;
    }
}
