import React from 'react';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { LanguageSelect } from './LanguageSelect';
import { localized } from '../../localization/components';

const _SettingsCard = ({ l }) => (
    <Card>
        <CardHeader title={l('settings')} />
        <CardContent>
            <LanguageSelect />
        </CardContent>
    </Card>
);

export const SettingsCard = localized(_SettingsCard);
