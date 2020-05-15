import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { Select, MenuItem, ListItemText, InputLabel } from '@material-ui/core';
import { localized } from '../../localization/components';

const _LanguageSelect = ({ setSelectedLanguage, locale, l }) => (
    <>
        <InputLabel htmlFor="languageSelect">
            {l('settings.language')}
        </InputLabel>
        <Select
            value={locale}
            onChange={event => setSelectedLanguage(event.target.value)}
            style={{
                width: '100%',
            }}
        >
            <MenuItem value="en">
                <ListItemText>
                    {l('settings.language.english')}
                </ListItemText>
            </MenuItem>
            <MenuItem value="ko">
                <ListItemText>
                    {l('settings.language.korean')}
                </ListItemText>
            </MenuItem>
        </Select>
    </>
);

const mapMobxToProps = ({ localization }) => ({
    setSelectedLanguage: localization.setSelectedLanguage,
});

export const LanguageSelect = localized(
    inject(mapMobxToProps)(observer(_LanguageSelect)),
);
