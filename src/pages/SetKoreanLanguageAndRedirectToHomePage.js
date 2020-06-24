import React from 'react';
import { inject, observer } from 'mobx-react';
import { Routes } from '../routes';

const _SetKoreanLanguageAndRedirectToHomePage = ({ localization, routerStore }) => {
    localization.setSelectedLanguage('kr');
    routerStore.router.goTo(Routes.home);

    return null;
};

const mapMobxToProps = ({ localization, store }) => ({
    localization,
    routerStore: store,
});

export const SetKoreanLanguageAndRedirectToHomePage = inject(mapMobxToProps)(observer(_SetKoreanLanguageAndRedirectToHomePage));
