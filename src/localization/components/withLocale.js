import React from 'react';
import { inject, observer } from 'mobx-react';
import { replacePlaceholder } from '../../utils/string-utils';

const mapMobxToProps = ({ localization }) => ({
    currentLabels: localization.selectedLanguageLabels,
    locale: localization.selectedLanguage,
    dateFnsLocale: localization.dateFnsLocale,
});

export const localized = WrappedComponent => inject(mapMobxToProps)(observer(props => {
    const { locale, currentLabels, dateFnsLocale } = props;

    const getLabel = (labelKey, bindings) => {
        let label = currentLabels[labelKey];

        if (bindings) {
            label = replacePlaceholder(label, bindings);
        }

        return label;
    };

    return <WrappedComponent l={getLabel} locale={locale} dateFnsLocale={dateFnsLocale} {...props} />;
}));
