import React from 'react';
import { inject } from 'mobx-react';
import { Routes } from '../routes';
import { StaticPageLinks } from './StaticPageLinks';
import { LogoutMenuItem } from '../Authorization/components';
import { localized } from '../localization/components';

const _DescriptionLinks = ({ routerStore, l }) => {
    const Prometeus = ' {Prometeus}';

    const links = {
        termsOfService: l('description-links.terms-of-service'),
        privacyPolicy: l('description-links.privacy-policy'),
    };
    const handleClose = () => null;


    return (
        <div className="description-links">
            <div>
                <p>
                    <StaticPageLinks
                        targetView={Routes.terms}
                        routerStore={routerStore}
                        linkTekst={links.termsOfService}
                    />
                </p>
                <p>&bull;</p>
                <p>
                    <StaticPageLinks
                        targetView={Routes.terms}
                        routerStore={routerStore}
                        linkTekst={links.privacyPolicy}
                    />
                </p>
               {/*
                <p>{l('menu.help-center')}</p>
                <LogoutMenuItem onClick={handleClose} isMenuItem />*/}
            </div>
            <div>
                <p>
                    © 2020
                    {Prometeus}
                    {' '}
                    Team
                </p>
            </div>
        </div>
    );
};

const mapMobxToProps = ({ store }) => ({
    routerStore: store,
});

export const DescriptionLinks = localized(
    inject(mapMobxToProps)(_DescriptionLinks),
);
