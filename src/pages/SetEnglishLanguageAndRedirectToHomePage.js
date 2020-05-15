import React from 'react';
import { inject, observer } from 'mobx-react';
import { Routes } from '../routes';

const _SetEnglishLanguageAndRedirectToHomePage = ({ localization, routerStore }) => {
    localization.setSelectedLanguage('en');
    routerStore.router.goTo(Routes.home);

    return null;
};

const mapMobxToProps = ({ localization, store }) => ({
    localization,
    routerStore: store,
});

export const SetEnglishLanguageAndRedirectToHomePage = inject(mapMobxToProps)(observer(_SetEnglishLanguageAndRedirectToHomePage));
