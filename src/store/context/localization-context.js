import { createContext } from 'react';
import { store } from '../store';
import { replacePlaceholder } from '../../utils/string-utils';

export const localizationContext = createContext(({
    l: (labelKey, bindings) => {
        let label = store.localization.selectedLanguageLabels[labelKey];

        if (bindings) {
            label = replacePlaceholder(label, bindings);
        }

        return label;
    },
    locale: store.localization.selectedLanguage,
    dateFnsLocale: store.localization.dateFnsLocale,
}));
