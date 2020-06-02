import { createContext } from 'react';
import { store } from '../store';
import { replacePlaceholder } from '../../utils/string-utils';
import {computed} from "mobx";

class LocalizationContextHolder {
    store = undefined;

    @computed
    get locale() {
        return this.store.localization.selectedLanguageContainer.selectedLanguage;
    }

    @computed
    get dateFnsLocale() {
        return this.store.localization.dateFnsLocale;
    }

    constructor(store) {
        this.store = store;
    }

    l = (labelKey, bindings) => {
        let label = this.store.localization.selectedLanguageLabels[labelKey];

        if (bindings) {
            label = replacePlaceholder(label, bindings);
        }

        return label;
    }
}

export const localizationContext = createContext(new LocalizationContextHolder(store));
